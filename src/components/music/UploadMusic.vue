<script setup>
import { ref, onMounted, watch } from 'vue'
import * as mmb from 'music-metadata-browser'
import { useRouter } from 'vue-router'
// import { uploadMusic } from '@api/musicApi'

const props = defineProps({
  files: FileList,
  resetFiles: Function
})

// const openAlert = useAlert()
const router = useRouter()

const editNavItems = ['Basic Info', 'Metadata']

const editBasicInfoRef = ref(null)
const editMetadataRef = ref(null)

const editNavIndex = ref(0)
const musicMetadata = ref(null)
const loading = ref(false)

const handleClick = async () => {
  if (!props.files || !musicMetadata.value) {
    props.resetFiles && props.resetFiles()
    return
  }

  const basicInfoData = editBasicInfoRef.value?.getData()
  const metadataData = editMetadataRef.value?.getData()

  if (!(basicInfoData && metadataData)) {
    editNavIndex.value = 0
    return
  }
  openAlert('업로드를 시작합니다.', { severity: 'info' })
  loading.value = true

  const { cover, ...musicData } = basicInfoData
  const { title, genre, description } = musicData
  const data = {
    ...musicData,
    duration: musicMetadata.value.duration,
    metadata: { title, genre, description, ...metadataData },
  }

  const formData = new FormData()
  formData.append('musics', props.files[0])
  if (cover) {
    formData.append('covers', cover)
  }
  formData.append(
    'datas',
    new Blob([JSON.stringify(data)], { type: 'application/json' })
  )

  let reset = false
  try {
    // await uploadMusic(formData)
    loading.value = false
    // openAlert('업로드에 성공하였습니다.', { severity: 'success' })
    if (window.confirm('계속해서 업로드 하시겠습니까?')) {
      reset = true
    } else {
      console.error('Upload failed', error);
    }
  }catch(error){
    console.error(error)
  }
};
</script>
<template>
  <div style="color: white"> Hello World
    <button @click="handleClick">Click</button>
  </div>
</template>

