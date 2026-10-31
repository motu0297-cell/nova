import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import {
  SiteSettings,
  Course,
  BlogPost,
  PricingPlan,
  Testimonial,
  FAQ,
  ContactInquiry,
} from '../types';
import {
  initialSiteSettings,
  initialCourses,
  initialBlogPosts,
  initialPricingPlans,
  initialTestimonials,
  initialFaqs,
} from '../data/initialData';

// Firestore Collection Keys
const COLLECTIONS = {
  SETTINGS: 'site_settings',
  COURSES: 'courses',
  BLOG: 'blog_posts',
  PRICING: 'pricing_plans',
  TESTIMONIALS: 'testimonials',
  FAQS: 'faqs',
  INQUIRIES: 'contact_inquiries',
  ADMINS: 'admins',
};

// Local storage backup keys for offline resilience
const STORAGE_KEYS = {
  SETTINGS: 'novafx_cached_settings',
  COURSES: 'novafx_cached_courses',
  BLOG: 'novafx_cached_blog',
  PRICING: 'novafx_cached_pricing',
  TESTIMONIALS: 'novafx_cached_testimonials',
  FAQS: 'novafx_cached_faqs',
};

function getLocalCache<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem(key);
    if (val) return JSON.parse(val);
  } catch (e) {
    console.warn('Local cache read error:', e);
  }
  return fallback;
}

function setLocalCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Local cache write error:', e);
  }
}

/**
 * Seed initial data to Firestore if collection is empty
 */
export async function initializeDatabaseIfEmpty() {
  try {
    // 1. Site Settings
    const settingsDocRef = doc(db, COLLECTIONS.SETTINGS, 'global');
    const settingsSnap = await getDoc(settingsDocRef);
    if (!settingsSnap.exists()) {
      await setDoc(settingsDocRef, {
        ...initialSiteSettings,
        updatedAt: new Date().toISOString(),
      });
      setLocalCache(STORAGE_KEYS.SETTINGS, initialSiteSettings);
    }

    // 2. Courses
    const coursesCol = collection(db, COLLECTIONS.COURSES);
    const coursesSnap = await getDocs(coursesCol);
    if (coursesSnap.empty) {
      for (const course of initialCourses) {
        await setDoc(doc(db, COLLECTIONS.COURSES, course.id), course);
      }
      setLocalCache(STORAGE_KEYS.COURSES, initialCourses);
    }

    // 3. Blog Posts
    const blogCol = collection(db, COLLECTIONS.BLOG);
    const blogSnap = await getDocs(blogCol);
    if (blogSnap.empty) {
      for (const post of initialBlogPosts) {
        await setDoc(doc(db, COLLECTIONS.BLOG, post.id), post);
      }
      setLocalCache(STORAGE_KEYS.BLOG, initialBlogPosts);
    }

    // 4. Pricing Plans
    const pricingCol = collection(db, COLLECTIONS.PRICING);
    const pricingSnap = await getDocs(pricingCol);
    if (pricingSnap.empty) {
      for (const plan of initialPricingPlans) {
        await setDoc(doc(db, COLLECTIONS.PRICING, plan.id), plan);
      }
      setLocalCache(STORAGE_KEYS.PRICING, initialPricingPlans);
    }

    // 5. Testimonials
    const testCol = collection(db, COLLECTIONS.TESTIMONIALS);
    const testSnap = await getDocs(testCol);
    if (testSnap.empty) {
      for (const test of initialTestimonials) {
        await setDoc(doc(db, COLLECTIONS.TESTIMONIALS, test.id), test);
      }
      setLocalCache(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
    }

    // 6. FAQs
    const faqCol = collection(db, COLLECTIONS.FAQS);
    const faqSnap = await getDocs(faqCol);
    if (faqSnap.empty) {
      for (const faq of initialFaqs) {
        await setDoc(doc(db, COLLECTIONS.FAQS, faq.id), faq);
      }
      setLocalCache(STORAGE_KEYS.FAQS, initialFaqs);
    }
  } catch (err) {
    console.warn('Initial seeding note (likely waiting for permissions or already initialized):', err);
  }
}

// ----------------- SITE SETTINGS -----------------
export async function getSiteSettings(): Promise<SiteSettings> {
  const fallback = getLocalCache<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'global');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as SiteSettings;
      setLocalCache(STORAGE_KEYS.SETTINGS, data);
      return data;
    }
    return fallback;
  } catch (error) {
    console.warn('Using cached settings due to fetch issue:', error);
    return fallback;
  }
}

export function subscribeSiteSettings(callback: (settings: SiteSettings) => void) {
  const docRef = doc(db, COLLECTIONS.SETTINGS, 'global');
  return onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as SiteSettings;
        setLocalCache(STORAGE_KEYS.SETTINGS, data);
        callback(data);
      }
    },
    (err) => {
      console.warn('Site settings snapshot error, using cached:', err);
      callback(getLocalCache<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSiteSettings));
    }
  );
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  setLocalCache(STORAGE_KEYS.SETTINGS, settings);
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'global');
    await setDoc(docRef, { ...settings, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.SETTINGS}/global`);
  }
}

// ----------------- COURSES -----------------
export async function getCourses(): Promise<Course[]> {
  const fallback = getLocalCache<Course[]>(STORAGE_KEYS.COURSES, initialCourses);
  try {
    const colRef = collection(db, COLLECTIONS.COURSES);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Course));
      setLocalCache(STORAGE_KEYS.COURSES, items);
      return items;
    }
    return fallback;
  } catch (error) {
    console.warn('Using cached courses:', error);
    return fallback;
  }
}

export function subscribeCourses(callback: (courses: Course[]) => void) {
  const colRef = collection(db, COLLECTIONS.COURSES);
  return onSnapshot(
    colRef,
    (snap) => {
      if (!snap.empty) {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Course));
        setLocalCache(STORAGE_KEYS.COURSES, items);
        callback(items);
      } else {
        callback(getLocalCache<Course[]>(STORAGE_KEYS.COURSES, initialCourses));
      }
    },
    (err) => {
      console.warn('Courses snapshot error, using cached:', err);
      callback(getLocalCache<Course[]>(STORAGE_KEYS.COURSES, initialCourses));
    }
  );
}

export async function saveCourse(course: Course): Promise<void> {
  const courses = getLocalCache<Course[]>(STORAGE_KEYS.COURSES, initialCourses);
  const idx = courses.findIndex((c) => c.id === course.id);
  if (idx >= 0) {
    courses[idx] = course;
  } else {
    courses.push(course);
  }
  setLocalCache(STORAGE_KEYS.COURSES, courses);

  try {
    const docRef = doc(db, COLLECTIONS.COURSES, course.id);
    await setDoc(docRef, { ...course, updatedAt: new Date().toISOString() });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.COURSES}/${course.id}`);
  }
}

export async function deleteCourse(id: string): Promise<void> {
  const courses = getLocalCache<Course[]>(STORAGE_KEYS.COURSES, initialCourses).filter((c) => c.id !== id);
  setLocalCache(STORAGE_KEYS.COURSES, courses);

  try {
    const docRef = doc(db, COLLECTIONS.COURSES, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTIONS.COURSES}/${id}`);
  }
}

// ----------------- BLOG POSTS -----------------
export async function getBlogPosts(): Promise<BlogPost[]> {
  const fallback = getLocalCache<BlogPost[]>(STORAGE_KEYS.BLOG, initialBlogPosts);
  try {
    const colRef = collection(db, COLLECTIONS.BLOG);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
      setLocalCache(STORAGE_KEYS.BLOG, items);
      return items;
    }
    return fallback;
  } catch (error) {
    console.warn('Using cached blog posts:', error);
    return fallback;
  }
}

export function subscribeBlogPosts(callback: (posts: BlogPost[]) => void) {
  const colRef = collection(db, COLLECTIONS.BLOG);
  return onSnapshot(
    colRef,
    (snap) => {
      if (!snap.empty) {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
        setLocalCache(STORAGE_KEYS.BLOG, items);
        callback(items);
      } else {
        callback(getLocalCache<BlogPost[]>(STORAGE_KEYS.BLOG, initialBlogPosts));
      }
    },
    (err) => {
      console.warn('Blog snapshot error, using cached:', err);
      callback(getLocalCache<BlogPost[]>(STORAGE_KEYS.BLOG, initialBlogPosts));
    }
  );
}

export async function saveBlogPost(post: BlogPost): Promise<void> {
  const posts = getLocalCache<BlogPost[]>(STORAGE_KEYS.BLOG, initialBlogPosts);
  const idx = posts.findIndex((p) => p.id === post.id);
  if (idx >= 0) {
    posts[idx] = post;
  } else {
    posts.push(post);
  }
  setLocalCache(STORAGE_KEYS.BLOG, posts);

  try {
    const docRef = doc(db, COLLECTIONS.BLOG, post.id);
    await setDoc(docRef, { ...post, updatedAt: new Date().toISOString() });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.BLOG}/${post.id}`);
  }
}

export async function deleteBlogPost(id: string): Promise<void> {
  const posts = getLocalCache<BlogPost[]>(STORAGE_KEYS.BLOG, initialBlogPosts).filter((p) => p.id !== id);
  setLocalCache(STORAGE_KEYS.BLOG, posts);

  try {
    const docRef = doc(db, COLLECTIONS.BLOG, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTIONS.BLOG}/${id}`);
  }
}

// ----------------- PRICING PLANS -----------------
export async function getPricingPlans(): Promise<PricingPlan[]> {
  const fallback = getLocalCache<PricingPlan[]>(STORAGE_KEYS.PRICING, initialPricingPlans);
  try {
    const colRef = collection(db, COLLECTIONS.PRICING);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as PricingPlan));
      items.sort((a, b) => a.sortOrder - b.sortOrder);
      setLocalCache(STORAGE_KEYS.PRICING, items);
      return items;
    }
    return fallback;
  } catch (error) {
    console.warn('Using cached pricing:', error);
    return fallback;
  }
}

export function subscribePricingPlans(callback: (plans: PricingPlan[]) => void) {
  const colRef = collection(db, COLLECTIONS.PRICING);
  return onSnapshot(
    colRef,
    (snap) => {
      if (!snap.empty) {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as PricingPlan));
        items.sort((a, b) => a.sortOrder - b.sortOrder);
        setLocalCache(STORAGE_KEYS.PRICING, items);
        callback(items);
      } else {
        callback(getLocalCache<PricingPlan[]>(STORAGE_KEYS.PRICING, initialPricingPlans));
      }
    },
    (err) => {
      console.warn('Pricing snapshot error, using cached:', err);
      callback(getLocalCache<PricingPlan[]>(STORAGE_KEYS.PRICING, initialPricingPlans));
    }
  );
}

export async function savePricingPlan(plan: PricingPlan): Promise<void> {
  const plans = getLocalCache<PricingPlan[]>(STORAGE_KEYS.PRICING, initialPricingPlans);
  const idx = plans.findIndex((p) => p.id === plan.id);
  if (idx >= 0) {
    plans[idx] = plan;
  } else {
    plans.push(plan);
  }
  setLocalCache(STORAGE_KEYS.PRICING, plans);

  try {
    const docRef = doc(db, COLLECTIONS.PRICING, plan.id);
    await setDoc(docRef, plan);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.PRICING}/${plan.id}`);
  }
}

export async function deletePricingPlan(id: string): Promise<void> {
  const plans = getLocalCache<PricingPlan[]>(STORAGE_KEYS.PRICING, initialPricingPlans).filter((p) => p.id !== id);
  setLocalCache(STORAGE_KEYS.PRICING, plans);

  try {
    const docRef = doc(db, COLLECTIONS.PRICING, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTIONS.PRICING}/${id}`);
  }
}

// ----------------- TESTIMONIALS -----------------
export async function getTestimonials(): Promise<Testimonial[]> {
  const fallback = getLocalCache<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  try {
    const colRef = collection(db, COLLECTIONS.TESTIMONIALS);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial));
      setLocalCache(STORAGE_KEYS.TESTIMONIALS, items);
      return items;
    }
    return fallback;
  } catch (error) {
    console.warn('Using cached testimonials:', error);
    return fallback;
  }
}

export function subscribeTestimonials(callback: (testimonials: Testimonial[]) => void) {
  const colRef = collection(db, COLLECTIONS.TESTIMONIALS);
  return onSnapshot(
    colRef,
    (snap) => {
      if (!snap.empty) {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial));
        setLocalCache(STORAGE_KEYS.TESTIMONIALS, items);
        callback(items);
      } else {
        callback(getLocalCache<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials));
      }
    },
    (err) => {
      console.warn('Testimonial snapshot error, using cached:', err);
      callback(getLocalCache<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials));
    }
  );
}

export async function saveTestimonial(testimonial: Testimonial): Promise<void> {
  const items = getLocalCache<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  const idx = items.findIndex((t) => t.id === testimonial.id);
  if (idx >= 0) {
    items[idx] = testimonial;
  } else {
    items.push(testimonial);
  }
  setLocalCache(STORAGE_KEYS.TESTIMONIALS, items);

  try {
    const docRef = doc(db, COLLECTIONS.TESTIMONIALS, testimonial.id);
    await setDoc(docRef, testimonial);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.TESTIMONIALS}/${testimonial.id}`);
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  const items = getLocalCache<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials).filter((t) => t.id !== id);
  setLocalCache(STORAGE_KEYS.TESTIMONIALS, items);

  try {
    const docRef = doc(db, COLLECTIONS.TESTIMONIALS, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTIONS.TESTIMONIALS}/${id}`);
  }
}

// ----------------- FAQS -----------------
export async function getFaqs(): Promise<FAQ[]> {
  const fallback = getLocalCache<FAQ[]>(STORAGE_KEYS.FAQS, initialFaqs);
  try {
    const colRef = collection(db, COLLECTIONS.FAQS);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as FAQ));
      items.sort((a, b) => a.sortOrder - b.sortOrder);
      setLocalCache(STORAGE_KEYS.FAQS, items);
      return items;
    }
    return fallback;
  } catch (error) {
    console.warn('Using cached faqs:', error);
    return fallback;
  }
}

export function subscribeFaqs(callback: (faqs: FAQ[]) => void) {
  const colRef = collection(db, COLLECTIONS.FAQS);
  return onSnapshot(
    colRef,
    (snap) => {
      if (!snap.empty) {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as FAQ));
        items.sort((a, b) => a.sortOrder - b.sortOrder);
        setLocalCache(STORAGE_KEYS.FAQS, items);
        callback(items);
      } else {
        callback(getLocalCache<FAQ[]>(STORAGE_KEYS.FAQS, initialFaqs));
      }
    },
    (err) => {
      console.warn('Faq snapshot error, using cached:', err);
      callback(getLocalCache<FAQ[]>(STORAGE_KEYS.FAQS, initialFaqs));
    }
  );
}

export async function saveFaq(faq: FAQ): Promise<void> {
  const items = getLocalCache<FAQ[]>(STORAGE_KEYS.FAQS, initialFaqs);
  const idx = items.findIndex((f) => f.id === faq.id);
  if (idx >= 0) {
    items[idx] = faq;
  } else {
    items.push(faq);
  }
  setLocalCache(STORAGE_KEYS.FAQS, items);

  try {
    const docRef = doc(db, COLLECTIONS.FAQS, faq.id);
    await setDoc(docRef, faq);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.FAQS}/${faq.id}`);
  }
}

export async function deleteFaq(id: string): Promise<void> {
  const items = getLocalCache<FAQ[]>(STORAGE_KEYS.FAQS, initialFaqs).filter((f) => f.id !== id);
  setLocalCache(STORAGE_KEYS.FAQS, items);

  try {
    const docRef = doc(db, COLLECTIONS.FAQS, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTIONS.FAQS}/${id}`);
  }
}

// ----------------- CONTACT INQUIRIES -----------------
export async function submitContactInquiry(inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>): Promise<void> {
  const newInquiry: ContactInquiry = {
    ...inquiry,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  try {
    const colRef = collection(db, COLLECTIONS.INQUIRIES);
    await addDoc(colRef, newInquiry);
  } catch (error) {
    // If firestore fails (or offline), keep in local inquiry list
    console.warn('Error submitting to firestore, saving local inquiry:', error);
    try {
      const stored = JSON.parse(localStorage.getItem('novafx_inquiries') || '[]');
      stored.unshift({ ...newInquiry, id: 'local-' + Date.now() });
      localStorage.setItem('novafx_inquiries', JSON.stringify(stored));
    } catch (e) {
      // ignore
    }
  }
}

export async function getContactInquiries(): Promise<ContactInquiry[]> {
  try {
    const colRef = collection(db, COLLECTIONS.INQUIRIES);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ContactInquiry));
    }
  } catch (e) {
    console.warn('Could not fetch cloud inquiries:', e);
  }
  try {
    return JSON.parse(localStorage.getItem('novafx_inquiries') || '[]');
  } catch (e) {
    return [];
  }
}

export async function updateInquiryStatus(id: string, status: 'new' | 'read' | 'replied'): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.INQUIRIES, id);
    await updateDoc(docRef, { status });
  } catch (e) {
    try {
      const stored: ContactInquiry[] = JSON.parse(localStorage.getItem('novafx_inquiries') || '[]');
      const idx = stored.findIndex((i) => i.id === id);
      if (idx >= 0) {
        stored[idx].status = status;
        localStorage.setItem('novafx_inquiries', JSON.stringify(stored));
      }
    } catch (err) {
      // ignore
    }
  }
}

// ----------------- REGISTERED USERS -----------------
export async function syncUserProfile(profile: {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}): Promise<void> {
  const record = {
    ...profile,
    lastLoginAt: new Date().toISOString(),
  };

  // 1. Sync to Firestore
  try {
    const userDoc = doc(db, 'users', profile.uid);
    await setDoc(userDoc, record, { merge: true });
  } catch (err) {
    console.warn('Firestore user profile sync note:', err);
  }

  // 2. Sync to Server Storage
  try {
    await fetch('/api/users/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
  } catch (err) {
    console.warn('Server user sync error:', err);
  }
}

export async function getRegisteredUsers(adminToken?: string): Promise<any[]> {
  // 1. Attempt Server-authorized endpoint
  if (adminToken) {
    try {
      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.users && Array.isArray(data.users)) {
          return data.users;
        }
      }
    } catch (err) {
      console.warn('Server users fetch error:', err);
    }
  }

  // 2. Fallback to Firestore users collection
  try {
    const colRef = collection(db, 'users');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
    }
  } catch (e) {
    console.warn('Firestore users fetch note:', e);
  }

  return [];
}

