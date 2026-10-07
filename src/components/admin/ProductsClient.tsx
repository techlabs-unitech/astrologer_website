'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Loader2, AlertCircle } from 'lucide-react'
import { productSchema, PRODUCT_CATEGORIES, type ProductSchema } from '@/lib/validations'
import type { Product } from '@/types/database'
import {
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductActive,
} from '@/app/admin/actions/products'
import { useLanguage } from '@/components/LanguageProvider'

interface Props { initialProducts: Product[] }

const CATEGORY_LABELS: Record<string, string> = {
  consultation: 'Consultation', report: 'Report', relationship: 'Relationship',
  career: 'Career', gemstone: 'Gemstone', yantra: 'Yantra',
  rudraksha: 'Rudraksha', vastu: 'Vastu', other: 'Other',
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {message}
    </p>
  )
}

// ProductSchema has `active?: boolean | undefined` due to Zod default().
// RHF's zodResolver needs a concrete type — use a local alias that tightens it.
type ProductFormValues = Omit<ProductSchema, 'active'> & { active: boolean }

function ProductForm({
  defaultValues,
  onSave,
  onCancel,
  submitLabel,
}: {
  defaultValues?: Partial<ProductFormValues>
  onSave: (data: ProductFormValues) => Promise<void>
  onCancel: () => void
  submitLabel: string
}) {
  const { t } = useLanguage()
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as import('react-hook-form').Resolver<ProductFormValues>,
    defaultValues: { active: true, ...defaultValues },
  })

  function onSubmit(data: ProductFormValues) {
    setServerError('')
    startTransition(async () => {
      try { await onSave(data) }
      catch { setServerError(`${t.common.products} ${t.common.save.toLowerCase()} failed.`) }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {serverError && (
        <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0" />{serverError}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="pf-name" className="label-cosmic">{t.common.productName} *</label>
          <input id="pf-name" className="input-cosmic" placeholder={t.common.productName} {...register('name')} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="pf-price" className="label-cosmic">{t.common.price} (₹) *</label>
          <input id="pf-price" type="number" step="0.01" className="input-cosmic"
            placeholder="999"
            {...register('price', { valueAsNumber: true })} />
          <FieldError message={errors.price?.message} />
        </div>
        <div>
          <label htmlFor="pf-cat" className="label-cosmic">{t.common.category} *</label>
          <select id="pf-cat" className="input-cosmic" {...register('category')}>
            <option value="">{t.common.category}</option>
            {PRODUCT_CATEGORIES.map(c => (
              <option key={c} value={c}>{CATEGORY_LABELS[c] ?? c}</option>
            ))}
          </select>
          <FieldError message={errors.category?.message} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="pf-desc" className="label-cosmic">{t.common.description} *</label>
          <textarea id="pf-desc" rows={3} className="input-cosmic resize-none"
            placeholder={t.common.description} {...register('description')} />
          <FieldError message={errors.description?.message} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="pf-img" className="label-cosmic">{t.common.imageUrl} <span className="text-muted text-xs">({t.common.optional})</span></label>
          <input id="pf-img" type="url" className="input-cosmic" placeholder="https://…" {...register('image_url')} />
          <FieldError message={errors.image_url?.message} />
        </div>
        <div className="flex items-center gap-3">
          <input id="pf-active" type="checkbox" className="w-4 h-4 accent-gold-bright" {...register('active')} />
          <label htmlFor="pf-active" className="text-sm text-silver cursor-pointer">{t.common.active}</label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 text-sm">{t.common.cancel}</button>
        <button type="submit" disabled={isPending} aria-busy={isPending} className="btn-primary flex-1 text-sm">
          {isPending ? <><Loader2 className="w-4 h-4 animate-spin" />{t.common.save}…</> : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default function ProductsClient({ initialProducts }: Props) {
  const { t } = useLanguage()
  const categoryLabels: Record<string, string> = {
    consultation: t.common.consultations, report: t.common.reports, relationship: t.common.relationships,
    career: t.common.career, gemstone: t.home.personalised, yantra: t.home.ancientWisdom, rudraksha: t.home.practical, other: t.common.all,
  }
  const [products, setProducts]           = useState(initialProducts)
  const [modal, setModal]                 = useState<'create' | 'edit' | null>(null)
  const [editTarget, setEditTarget]       = useState<Product | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [feedback, setFeedback]           = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [isPending, startTransition]      = useTransition()

  function flash(type: 'ok' | 'err', msg: string) {
    setFeedback({ type, msg })
    setTimeout(() => setFeedback(null), 3000)
  }

  async function handleCreate(data: ProductFormValues) {
    const result = await createProduct(data)
    if (result.success) {
      setModal(null)
      flash('ok', `${t.common.products} created.`)
      // Re-fetch is handled by revalidatePath; optimistic: just close modal
    } else {
      throw new Error(result.error)
    }
  }

  async function handleUpdate(data: ProductFormValues) {
    if (!editTarget) return
    const result = await updateProduct(editTarget.id, data)
    if (result.success) {
      setProducts(prev => prev.map(p => p.id === editTarget.id
        ? { ...p, ...data, image_url: data.image_url?.trim() || null }
        : p))
      setModal(null)
      setEditTarget(null)
      flash('ok', `${t.common.products} updated.`)
    } else {
      throw new Error(result.error)
    }
  }

  function handleDeleteConfirm(id: string) {
    startTransition(async () => {
      const result = await deleteProduct(id)
      if (result.success) {
        setProducts(prev => prev.filter(p => p.id !== id))
        flash('ok', `${t.common.products} deleted.`)
      } else {
        flash('err', result.error ?? `${t.common.products} delete failed.`)
      }
      setDeleteConfirm(null)
    })
  }

  function handleToggle(id: string, active: boolean) {
    startTransition(async () => {
      const result = await toggleProductActive(id, active)
      if (result.success) {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, active } : p))
      } else {
        flash('err', result.error ?? `${t.common.products} update failed.`)
      }
    })
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-muted">{products.length} {t.common.products}</p>
        <button type="button" onClick={() => setModal('create')} className="btn-primary text-sm px-5">
          <Plus className="w-4 h-4" />{t.common.add} {t.common.products}
        </button>
      </div>

      {feedback && (
        <div role="status" className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm
          ${feedback.type === 'ok' ? 'border-emerald-700/40 bg-emerald-900/30 text-emerald-300' : 'border-red-800/50 bg-red-950/30 text-red-300'}`}>
          {feedback.msg}
        </div>
      )}

      {products.length === 0 && !modal && (
        <div className="card-cosmic px-5 py-16 text-center text-muted text-sm">
          {t.common.noProducts}
        </div>
      )}

      {/* Product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map(product => (
          <div key={product.id} className={`card-cosmic p-5 flex flex-col gap-3 ${!product.active ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-cream font-semibold text-sm leading-snug">{product.name}</p>
                <span className="badge-violet text-[10px] mt-1">{categoryLabels[product.category] ?? product.category}</span>
              </div>
              <p className="font-serif font-bold text-gold-bright text-base shrink-0">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
            </div>
            <p className="text-muted text-xs leading-relaxed line-clamp-2">{product.description}</p>

            <div className="flex items-center justify-between pt-2 border-t border-cosmic-border mt-auto">
              {/* Active toggle */}
              <button type="button" onClick={() => handleToggle(product.id, !product.active)}
                disabled={isPending}
                aria-label={product.active ? 'Deactivate product' : 'Activate product'}
                className="flex items-center gap-1.5 text-xs text-muted hover:text-cream transition-colors">
                {product.active
                  ? <ToggleRight className="w-5 h-5 text-emerald-400" />
                  : <ToggleLeft className="w-5 h-5 text-muted" />}
                {product.active ? t.common.active : t.common.inactive}
              </button>

              {/* Edit + Delete */}
              <div className="flex gap-2">
                <button type="button"
                  onClick={() => { setEditTarget(product); setModal('edit') }}
                  aria-label={`Edit ${product.name}`}
                  className="w-8 h-8 rounded-lg border border-cosmic-border flex items-center justify-center text-muted hover:text-cream hover:border-violet/40 transition-all">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button type="button"
                  onClick={() => setDeleteConfirm(product.id)}
                  aria-label={`Delete ${product.name}`}
                  className="w-8 h-8 rounded-lg border border-cosmic-border flex items-center justify-center text-muted hover:text-red-400 hover:border-red-800/40 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true"
          aria-label={modal === 'create' ? 'Create product' : 'Edit product'}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setModal(null); setEditTarget(null) }} />
          <div className="relative z-10 w-full max-w-lg card-cosmic p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-cream font-semibold text-lg">
                {modal === 'create' ? `${t.common.add} ${t.common.products}` : `${t.common.edit} ${t.common.products}`}
              </h2>
              <button type="button" onClick={() => { setModal(null); setEditTarget(null) }}
                aria-label={t.common.close} className="text-muted hover:text-cream transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <ProductForm
              defaultValues={modal === 'edit' && editTarget ? {
                name: editTarget.name, description: editTarget.description,
                price: editTarget.price, category: editTarget.category,
                active: editTarget.active,
                image_url: editTarget.image_url ?? '',
              } : undefined}
              onSave={modal === 'create' ? handleCreate : handleUpdate}
              onCancel={() => { setModal(null); setEditTarget(null) }}
              submitLabel={modal === 'create' ? `${t.common.add} ${t.common.products}` : t.common.saveChanges}
            />
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label={t.common.deleteProduct}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative z-10 w-full max-w-sm card-cosmic p-6 flex flex-col gap-4">
            <h2 className="font-serif text-cream font-semibold">{t.common.deleteProduct}?</h2>
            <p className="text-silver text-sm">{t.home.finalDescription}</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1 text-sm">{t.common.cancel}</button>
              <button type="button" onClick={() => handleDeleteConfirm(deleteConfirm)}
                disabled={isPending}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold bg-red-600 text-white hover:bg-red-500 transition-colors disabled:opacity-60">
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {t.common.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
