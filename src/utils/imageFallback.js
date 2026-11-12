export const FALLBACK_PLANT_IMAGE =
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1000&q=80';

export const handleImageError = (event) => {
  const target = event.currentTarget;
  if (!target || target.dataset.fallbackApplied === 'true') return;

  target.dataset.fallbackApplied = 'true';
  target.src = FALLBACK_PLANT_IMAGE;
};
