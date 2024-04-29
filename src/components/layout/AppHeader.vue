<template>
    <q-header class="bg-primary text-white-8 q-py-xs" height-hint="58">
        <q-toolbar>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            <q-toolbar-title shrink class="text-weight-bold">
                <a @click="reset()" style="cursor: pointer">業務日誌</a>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
</template>
  
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

import { useViewerStore } from "../../stores/viewer";
const viewerStore = useViewerStore();
import { ref } from "vue";

const drawer = ref(false);

const reset = () => {
    const path = router.currentRoute.value.path;
    if (path != "/") {
        viewerStore.reset();
        router.push("/");
    }
};
</script>
  