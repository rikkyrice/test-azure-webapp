<template>
    <q-dialog v-model="viewerStore.is_error">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">{{ viewerStore.error_title }}</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>{{ viewerStore.error_message }}</q-card-section>
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { useViewerStore } from '../../stores/viewer';

const viewerStore = useViewerStore();

</script>