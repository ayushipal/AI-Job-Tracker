'use client'
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signOut } from "next-auth/react";

import { 
  Briefcase, Building2, FileText, Clock, Plus, Edit3, Trash2,
  ArrowLeft, LogOut, BarChart3, Users, Zap, Link2, Mail, Lock, User,
  Home, ChevronLeft, X
} from 'lucide-react'

const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  description: z.string().optional(),
  url: z.string().url('Invalid URL').optional().or(z.literal('')),
  status: z.enum(['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'])
})

type JobForm = z.infer<typeof jobSchema>

interface Job {
  id: string
  title: string
  company: string
  status: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED'
  description?: string
  url?: string
  appliedDate: string
}

const statusConfig = {
  APPLIED: { color: 'blue', label: 'Applied', icon: '📩' },
  INTERVIEW: { color: 'orange', label: 'Interview', icon: '🎤' },
  OFFER: { color: 'green', label: 'Offer', icon: '🎉' },
  REJECTED: { color: 'red', label: 'Rejected', icon: '❌' }
} as const

export default function Dashboard() {
    const router = useRouter()

const { data: session, status } = useSession();

useEffect(() => {
  if (status === "loading") return;

  if (!session) {
    router.push("/");
  }
}, [session, status, router]);
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'applied' | 'interview' | 'offer' | 'rejected'>('all')

  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<JobForm>({
    resolver: zodResolver(jobSchema),
    defaultValues: { status: 'APPLIED' }
  })

  const watchedStatus = watch('status')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/jobs', { 
        method: 'GET',
        credentials: 'include',
        cache: 'no-store'
      })
      
      if (res.ok) {
        const data = await res.json()
        setJobs(data)
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: JobForm) => {
    setFormLoading(true)
    try {
      const url = editingJob ? `/api/jobs/${editingJob.id}` : '/api/jobs'
      const method = editingJob ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      })

      if (res.ok) {
        reset({ status: 'APPLIED' })
        setEditingJob(null)
        setShowForm(false)
        fetchJobs()
      } else {
        const errorData = await res.json()
        alert(errorData.error || 'Failed to save job')
      }
    } catch (error) {
      alert('Failed to save job. Please refresh and try again.')
    } finally {
      setFormLoading(false)
    }
  }

  const deleteJob = async (id: string) => {
    if (!confirm('Delete this job?')) return
    
    try {
      await fetch(`/api/jobs/${id}`, { 
        method: 'DELETE',
        credentials: 'include'
      })
      fetchJobs()
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  const logout = () => {
  signOut({ callbackUrl: "/" });
};

  // NEW: Navigation Functions
  const goToMainPage = () => {
  router.push('/profile')
}

  const goToProfile = () => {
    router.push('/profile') // Change to your profile route
  }

  // ENHANCED: Track Job Handler
  const handleTrackJobClick = () => {
    setShowForm(true)
    setEditingJob(null)
    reset()
  }

  const filteredJobs = jobs.filter(job => activeTab === 'all' || job.status.toLowerCase() === activeTab)

  const editJob = (job: Job) => {
    setEditingJob(job)
    setShowForm(true)
    setValue('title', job.title)
    setValue('company', job.company)
    setValue('description', job.description || '')
    setValue('url', job.url || '')
    setValue('status', job.status)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-8 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
          <h2 className="text-2xl font-bold text-gray-700">Loading your jobs...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* ENHANCED HEADER - ALL BUTTONS */}
      <header className="sticky top-0 z-50 border-b shadow-lg bg-white/95 backdrop-blur-xl border-white/60">
        <div className="max-w-6xl px-6 py-6 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* ✅ BACK TO MAIN PAGE BUTTON */}
              <Button
                variant="outline"
                size="lg"
                onClick={goToMainPage}
                className="px-6 font-bold transition-all duration-300 border-2 border-gray-200 shadow-lg h-14 hover:shadow-xl hover:border-indigo-300 hover:bg-indigo-50"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Main Dashboard
              </Button>
              
              <div className="p-4 shadow-2xl bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text">
                  AI Job Tracker
                </h1>
                <p className="font-semibold text-indigo-600">Track • Organize • Land Your Dream Job</p>
              </div>
            </div>

            {/* ALL NAVIGATION BUTTONS */}
            <div className="flex items-center space-x-3">
              {/* PROFILE BUTTON */}
              <Button 
                onClick={goToProfile}
                className="px-6 text-lg font-bold transition-all duration-300 shadow-xl h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                <User className="w-5 h-5 mr-2" />
                Profile
              </Button>
              
              {/* TRACK JOB BUTTON - FULLY FUNCTIONAL */}
              <Button 
                onClick={handleTrackJobClick}
                className="px-8 text-xl font-black transition-all duration-300 transform shadow-2xl h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-105"
              >
                <Plus className="w-6 h-6 mr-2" />
                Track Job
              </Button>
              
              {/* LOGOUT BUTTON */}
              <Button 
                onClick={logout}
                className="px-8 text-lg font-bold transition-all duration-300 transform shadow-xl h-14 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 hover:scale-105"
              >
                <LogOut className="w-6 h-6 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* TRACK JOB SUCCESS BANNER */}
      {showForm && (
        <div className="sticky z-40 max-w-6xl mx-6 mb-8 top-24">
          <div className="p-6 duration-500 border-l-4 shadow-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500 rounded-2xl backdrop-blur-sm animate-in slide-in-from-top-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emerald-500/20 rounded-2xl">
                  <Zap className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-800">🎯 Track Job Mode Active</h3>
                  <p className="text-emerald-700">Fill out the form below to track your job application</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowForm(false)
                  setEditingJob(null)
                  reset()
                }}
                className="font-bold text-emerald-700 hover:bg-emerald-200"
              >
                <X className="w-4 h-4 mr-1" />
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl px-6 py-12 mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-4">
          {[
            { label: 'Total Jobs', value: jobs.length, icon: BarChart3, color: 'indigo' },
            { label: 'Applied', value: jobs.filter(j => j.status === 'APPLIED').length, icon: Clock, color: 'blue' },
            { label: 'Interviews', value: jobs.filter(j => j.status === 'INTERVIEW').length, icon: Users, color: 'orange' },
            { label: 'Offers', value: jobs.filter(j => j.status === 'OFFER').length, icon: Zap, color: 'green' }
          ].map(({ label, value, icon: Icon, color }, i) => (
            <div key={i} className="p-8 transition-all duration-500 border shadow-2xl cursor-pointer group bg-white/80 backdrop-blur-xl rounded-3xl border-white/50 hover:shadow-3xl hover:-translate-y-2">
              <div className="flex items-center justify-between">
                <div className={`p-4 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-2xl shadow-lg`}>
                  <Icon className="text-white h-7 w-7" />
                </div>
                <div>
                  <p className="text-3xl font-black text-gray-900">{value}</p>
                  <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">{label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status Tabs */}
        <div className="p-6 mb-12 border shadow-xl bg-white/70 backdrop-blur-xl rounded-3xl border-white/50">
          <div className="flex flex-wrap justify-center gap-3">
            {(['all', 'applied', 'interview', 'offer', 'rejected'] as const).map(tab => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                onClick={() => setActiveTab(tab)}
                className={`font-bold capitalize px-6 py-3 rounded-2xl shadow-lg transition-all ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-purple-500/50' 
                    : 'hover:shadow-lg border-gray-300'
                }`}
              >
                {statusConfig[tab as keyof typeof statusConfig]?.label || tab.toUpperCase()}
                <span className="px-3 py-1 ml-2 text-xs font-bold bg-white/30 rounded-2xl">
                  {jobs.filter(j => j.status.toLowerCase() === tab).length}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Track Job Form */}
        {showForm && (
          <div className="p-10 mb-12 duration-500 border shadow-2xl bg-white/30 backdrop-blur-2xl rounded-3xl border-white/50 animate-in fade-in-50">
            <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/30">
              <h2 className="text-4xl font-black text-transparent bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text">
                {editingJob ? '✏️ Update Job' : '🎯 Track New Job'}
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={() => {
                  setShowForm(false)
                  setEditingJob(null)
                  reset()
                }}
                className="px-8 font-bold text-red-600 h-14 hover:bg-red-500/20 hover:text-red-500"
              >
                Cancel
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <label className="block mb-4 text-lg font-bold text-gray-800">
                    <Briefcase className="inline w-6 h-6 mr-2 text-indigo-600" />
                    Job Title *
                  </label>
                  <Input
                    className="h-16 text-xl border-2 border-indigo-200 shadow-xl bg-white/80 focus:border-indigo-500"
                    {...register('title')}
                    placeholder="Fullstack Developer at OpenAI"
                  />
                  {errors.title && <p className="mt-2 font-semibold text-red-500">{errors.title.message}</p>}
                </div>

                <div>
                  <label className="block mb-4 text-lg font-bold text-gray-800">
                    <Building2 className="inline w-6 h-6 mr-2 text-blue-600" />
                    Company *
                  </label>
                  <Input
                    className="h-16 text-xl border-2 border-blue-200 shadow-xl bg-white/80 focus:border-blue-500"
                    {...register('company')}
                    placeholder="OpenAI, Google, Microsoft"
                  />
                  {errors.company && <p className="mt-2 font-semibold text-red-500">{errors.company.message}</p>}
                </div>
              </div>

              <div className="space-y-6">
                <div className="lg:col-span-2">
                  <label className="block mb-4 text-lg font-bold text-gray-800">
                    <FileText className="inline w-6 h-6 mr-2 text-purple-600" />
                    Description (Optional)
                  </label>
                  <Textarea
                    className="h-32 p-6 text-lg border-2 border-purple-200 shadow-xl bg-white/80 focus:border-purple-500 resize-vertical"
                    {...register('description')}
                    placeholder="Write about the role, responsibilities, tech stack..."
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block mb-4 text-lg font-bold text-gray-800">
                    📊 Application Status *
                  </label>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {(['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'] as const).map(status => (
                      <Button
                        key={status}
                        type="button"
                        onClick={() => setValue('status', status)}
                        className={`h-20 p-4 font-bold shadow-xl transition-all group hover:shadow-2xl hover:scale-105 ${
                          watchedStatus === status
                            ? `bg-gradient-to-r from-${statusConfig[status].color}-500 to-${statusConfig[status].color}-600 text-white shadow-${statusConfig[status].color}-500/50`
                            : 'bg-white/80 border-2 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <span className="text-3xl">{statusConfig[status].icon}</span>
                          <span className="text-sm font-bold tracking-wide uppercase">{statusConfig[status].label}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 lg:col-span-2">
                  <Button 
                    type="submit" 
                    disabled={formLoading}
                    className="w-full h-20 text-2xl font-black transition-all duration-300 shadow-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-700 hover:shadow-3xl hover:scale-105"
                  >
                    {formLoading ? (
                      <>
                        <div className="w-8 h-8 mr-4 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
                        Saving...
                      </>
                    ) : editingJob ? (
                      '✏️ Update Job Details'
                    ) : (
                      '🎯 Track This Job Now!'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Jobs List */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="p-8 overflow-hidden transition-all duration-500 border shadow-2xl bg-white/80 backdrop-blur-xl rounded-3xl border-white/50 hover:shadow-3xl hover:-translate-y-4 group"
              >
                <div className="flex items-start justify-between pb-6 mb-6 border-b border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className={`p-4 bg-gradient-to-br from-${statusConfig[job.status as keyof typeof statusConfig].color}-500 to-${statusConfig[job.status as keyof typeof statusConfig].color}-600 rounded-2xl shadow-2xl`}>
                      <span className="text-3xl">{statusConfig[job.status as keyof typeof statusConfig].icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-2xl font-black text-gray-900 transition-all group-hover:text-indigo-600 line-clamp-2">
                        {job.title}
                      </h3>
                      <p className="text-xl font-bold text-indigo-700 transition-all group-hover:text-indigo-600">
                        {job.company}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`px-6 py-3 rounded-2xl text-sm font-black shadow-lg text-white ${
                    `bg-gradient-to-r from-${statusConfig[job.status as keyof typeof statusConfig].color}-500 to-${statusConfig[job.status as keyof typeof statusConfig].color}-600`
                  }`}>
                    {statusConfig[job.status as keyof typeof statusConfig].label}
                  </div>
                </div>

                {job.description && (
                  <div className="p-6 mb-8 border-l-4 border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
                    <p className="leading-relaxed text-gray-700 line-clamp-4">{job.description}</p>
                  </div>
                )}

                <div className="flex items-center justify-between mb-8 text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center font-semibold text-indigo-600">
                      <Clock className="w-5 h-5 mr-2" />
                      {new Date(job.appliedDate).toLocaleDateString()}
                    </div>
                    {job.url && (
                      <a href={job.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-2 font-semibold text-indigo-600 transition-all hover:text-indigo-500 rounded-xl hover:bg-indigo-100">
                        <Link2 className="w-5 h-5 mr-2" />
                        Open Application
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex p-4 space-x-3 transition-all duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl">
                  <Button
                    size="sm"
                    onClick={() => editJob(job)}
                    className="flex-1 font-bold shadow-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 h-14"
                  >
                    <Edit3 className="w-5 h-5 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => deleteJob(job.id)}
                    className="flex-1 font-bold shadow-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 h-14"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ENHANCED EMPTY STATE WITH ALL BUTTONS */
          <div className="py-32 text-center border-0 shadow-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 backdrop-blur-xl rounded-3xl">
            <div className="flex items-center justify-center w-32 h-32 mx-auto mb-8 border-4 shadow-2xl bg-gradient-to-r from-indigo-400/80 to-purple-400/80 rounded-3xl border-white/30">
              <Briefcase className="w-16 h-16 text-white shadow-lg" />
            </div>
            <h3 className="mb-6 text-5xl font-black text-transparent bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text">
              No jobs tracked yet
            </h3>
            <p className="max-w-2xl mx-auto mb-12 text-xl leading-relaxed text-gray-600">
              Click "Track Job" above to start monitoring your applications and stay organized!
            </p>
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <Button
                onClick={handleTrackJobClick}
                size="lg"
                className="w-full h-20 px-12 text-2xl font-black transition-all duration-300 transform shadow-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-700 hover:scale-105 sm:w-auto"
              >
                <Plus className="w-8 h-8 mr-3" />
                Track Your First Job
              </Button>
              <Button
                onClick={goToMainPage}
                variant="outline"
                size="lg"
                className="w-full h-20 px-12 text-xl font-bold transition-all duration-300 border-2 border-gray-300 shadow-xl hover:shadow-2xl hover:border-indigo-400 sm:w-auto"
              >
                <Home className="w-6 h-6 mr-2" />
                Main Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-12 mt-24 border-t bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-xl border-white/40">
        <div className="max-w-6xl px-6 mx-auto text-center">
          <div className="mb-8">
            <h3 className="mb-4 text-3xl font-black text-white">AI Job Tracker</h3>
            <div className="flex justify-center mb-8 space-x-8">
              <a href="https://github.com/yourusername/ai-job-tracker" className="p-4 transition-all shadow-xl group rounded-2xl bg-white/20 hover:bg-white/40">
                <svg className="w-8 h-8 text-white transition-transform fill-current group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/linkedin" className="p-4 transition-all shadow-xl group rounded-2xl bg-white/20 hover:bg-white/40">
                <svg className="w-8 h-8 text-white transition-transform fill-current group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          <p className="text-lg text-indigo-200">Built with Next.js 16, TypeScript, Prisma & Tailwind CSS</p>
          <p className="mt-2 text-sm text-indigo-300">House of EdTech Assignment 1 • Jan 2026</p>
        </div>
      </footer>
    </div>
  )
}