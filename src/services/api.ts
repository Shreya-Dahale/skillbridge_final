import { mockStore } from './mockStore';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CANDIDATE' | 'EMPLOYER';
  profile?: any;
}

export const getStoredToken = (): string | null => {
  return localStorage.getItem('skilbridge_token');
};

export const setStoredToken = (token: string) => {
  localStorage.setItem('skilbridge_token', token);
};

export const clearStoredToken = () => {
  localStorage.removeItem('skilbridge_token');
  localStorage.removeItem('skilbridge_user');
};

export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('skilbridge_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
};

export const setStoredUser = (user: User) => {
  localStorage.setItem('skilbridge_user', JSON.stringify(user));
};

// Route through mock store
async function handleMockRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method || 'GET').toUpperCase();
  let body: any = {};
  if (options.body && typeof options.body === 'string') {
    try {
      body = JSON.parse(options.body);
    } catch (e) {
      body = {};
    }
  }

  // Artificial slight delay for realistic UI loading states
  await new Promise(res => setTimeout(res, 80));

  // --- AUTH ROUTES ---
  if (endpoint === '/auth/login/candidate' && method === 'POST') {
    return mockStore.loginCandidate(body.email) as T;
  }
  if (endpoint === '/auth/login/employer' && method === 'POST') {
    return mockStore.loginEmployer(body.email) as T;
  }
  if (endpoint === '/auth/register/candidate' && method === 'POST') {
    return mockStore.registerCandidate(body) as T;
  }
  if (endpoint === '/auth/register/employer' && method === 'POST') {
    return mockStore.registerEmployer(body) as T;
  }
  if (endpoint === '/auth/me' && method === 'GET') {
    const user = getStoredUser();
    if (!user) throw new Error('Not authenticated');
    return { user } as T;
  }

  // --- CANDIDATE ROUTES ---
  if (endpoint === '/candidate/profile') {
    if (method === 'GET') return mockStore.getCandidateProfile() as T;
    if (method === 'PUT') return mockStore.updateCandidateProfile(body) as T;
  }
  if (endpoint === '/candidate/career-history' && method === 'POST') {
    return mockStore.addCareerHistory(body) as T;
  }
  if (endpoint.startsWith('/candidate/career-history/') && method === 'DELETE') {
    const id = endpoint.split('/candidate/career-history/')[1];
    return mockStore.deleteCareerHistory(id) as T;
  }
  if (endpoint === '/candidate/evidence' && method === 'POST') {
    return mockStore.addEvidence(body) as T;
  }
  if (endpoint.startsWith('/candidate/evidence/') && method === 'DELETE') {
    const id = endpoint.split('/candidate/evidence/')[1];
    return mockStore.deleteEvidence(id) as T;
  }
  if (endpoint === '/candidate/skills' && method === 'POST') {
    return mockStore.addSkill(body) as T;
  }
  if (endpoint === '/candidate/skill-gap-analysis' && method === 'GET') {
    return mockStore.getSkillGapAnalysis() as T;
  }
  if (endpoint === '/candidate/matched-jobs' && method === 'GET') {
    return mockStore.getMatchedJobs() as T;
  }
  if (endpoint === '/candidate/evidence-profile' && method === 'GET') {
    return mockStore.getEvidenceProfile() as T;
  }
  if (endpoint === '/candidate/share-profile' && method === 'POST') {
    return { shareLink: window.location.origin + '/public/evidence/cand-priya-01' } as T;
  }

  // --- ASSESSMENTS ROUTES ---
  if (endpoint === '/assessments' && method === 'GET') {
    return mockStore.getAssessments() as T;
  }
  if (endpoint.startsWith('/assessments/') && endpoint.endsWith('/submit') && method === 'POST') {
    const parts = endpoint.split('/');
    const assessmentId = parts[2];
    return mockStore.submitAssessment(assessmentId, body.answers) as T;
  }
  if (endpoint.startsWith('/assessments/') && method === 'GET') {
    const id = endpoint.split('/assessments/')[1];
    return mockStore.getAssessmentById(id) as T;
  }

  // --- EMPLOYER ROUTES ---
  if (endpoint === '/employer/profile' && method === 'GET') {
    return mockStore.getEmployerProfile() as T;
  }
  if (endpoint.startsWith('/employer/talent-pool') && method === 'GET') {
    const url = new URL('http://localhost' + endpoint);
    const skill = url.searchParams.get('skill') || undefined;
    const role = url.searchParams.get('role') || undefined;
    return mockStore.getTalentPool(skill, role) as T;
  }
  if (endpoint.startsWith('/employer/candidate/') && endpoint.endsWith('/evidence-profile') && method === 'GET') {
    const parts = endpoint.split('/');
    const candidateId = parts[3];
    return mockStore.getCandidateDossier(candidateId) as T;
  }
  if (endpoint.startsWith('/employer/candidate/') && endpoint.endsWith('/status') && method === 'POST') {
    const parts = endpoint.split('/');
    const candidateId = parts[3];
    return mockStore.updateCandidateStatus(candidateId, body.status, body.notes) as T;
  }
  if (endpoint === '/employer/jobs') {
    if (method === 'GET') return mockStore.getEmployerJobs() as T;
    if (method === 'POST') return mockStore.createJob(body) as T;
  }
  if (endpoint.startsWith('/employer/jobs/') && method === 'DELETE') {
    const jobId = endpoint.split('/employer/jobs/')[1];
    return mockStore.deleteJob(jobId) as T;
  }

  // --- JOBS & PUBLIC PROFILE ---
  if (endpoint === '/jobs' && method === 'GET') {
    return mockStore.getAllJobs() as T;
  }
  if (endpoint.startsWith('/jobs/public/evidence/') && method === 'GET') {
    const id = endpoint.split('/jobs/public/evidence/')[1];
    return mockStore.getPublicEvidence(id) as T;
  }

  // Fallback for any unknown route
  console.warn(`[Mock API] Route not explicitly matched: ${method} ${endpoint}, returning empty object`);
  return {} as T;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // If a live backend is specified via VITE_API_URL, attempt to call it first
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (response.ok) {
        return (await response.json()) as T;
      }
    } catch (err) {
      console.warn(`Live API call to ${API_BASE_URL}${endpoint} failed. Falling back to in-browser store:`, err);
    }
  }

  // If no backend URL configured or live request failed, execute with guaranteed in-browser store
  return handleMockRequest<T>(endpoint, options);
}
