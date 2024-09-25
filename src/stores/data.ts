import { ref, computed, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { fetchPhotos } from '../api'

export const useDataStore = defineStore('data', () => {
  watchEffect(() => {
    fetchPhotos()
  })

  return {}
})
