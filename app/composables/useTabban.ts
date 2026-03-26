// composables/useTabban.ts
// The sacred hook that summons Arabic rage from the void.

export interface TaasResponse {
  phrase: string;
  translation: string;
  level: string;
  meme_url: string;
  warning?: string;
}

export interface TaasOptions {
  level?: string;
}

export function useTabban() {
  const data = ref<TaasResponse | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const shakeKey = ref(0); // used to re-trigger shake animation

  async function fetchRandom(opts: TaasOptions = {}) {
    loading.value = true;
    error.value = null;

    try {
      const params = new URLSearchParams();
      if (opts.level) params.set("level", opts.level);

      const url = `/api/tabban${params.toString() ? "?" + params.toString() : ""}`;
      const result = await $fetch<TaasResponse>(url);
      data.value = result;
      shakeKey.value++; // re-trigger animation
    } catch (err: any) {
      error.value =
        err?.data?.data?.error ||
        err?.message ||
        "Something broke. Very on-brand.";
    } finally {
      loading.value = false;
    }
  }

  async function fetchRoast(level = "savage") {
    loading.value = true;
    error.value = null;

    try {
      const result = await $fetch<TaasResponse>(`/api/roast?level=${level}`);
      data.value = result;
      shakeKey.value++;
    } catch (err: any) {
      error.value =
        err?.data?.data?.error ||
        err?.message ||
        "The roast backfired. Awkward.";
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, shakeKey, fetchRandom, fetchRoast };
}
