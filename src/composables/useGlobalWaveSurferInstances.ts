import { ref, provide, inject } from 'vue';

const waveSurferInstancesSymbol = Symbol('waveSurferInstances');

export function provideWaveSurferInstances() {
  const waveSurferInstances = ref({});
  const currentPlayingId = ref(null);

  provide(waveSurferInstancesSymbol, { waveSurferInstances, currentPlayingId });
}

export function useGlobalWaveSurferInstances() {
  const waveSurferInstances = inject(waveSurferInstancesSymbol);
  if (!waveSurferInstances) {
    throw new Error('useGlobalWaveSurferInstances must be used within a provideWaveSurferInstances');
  }
  return waveSurferInstances;
}