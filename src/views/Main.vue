<template>
  <div class="q-pa-md">
    <div class="q-pa-md flex flex-center" v-if="update">
      <div>
        <q-circular-progress indeterminate rounded size="30px" color="primary" class="q-ma-md" />
      </div>
      <h5>更新中</h5>
    </div>
    <q-table title="業務日誌一覧" :rows="rows" :columns="columns" row-key="name" v-else>
      <template v-slot:top>
        <div class="col-3 q-table__title"> 業務日誌一覧 </div>
        <q-space />
        <div class="col-8 text-right ">
          <q-btn flat round size="lg" color="primary" icon="refresh" @click="refresh()" />
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="date" :props="props">
            {{ props.row.date }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="title" :props="props">
            {{ props.row.title }}
          </q-td>
          <q-td key="created_at" :props="props">
            {{ props.row.created_at }}
          </q-td>
          <q-td key="actions" :props="props">
            <div>
              <q-btn name="edit" label="編集" icon="edit" @click="" />
              <q-btn name="delete" label="削除" icon="delete" @click="" />
            </div>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:bottom-row>
        <q-tr class="text-center">
          <q-td key="title" />
          <q-td key="userid" />
          <q-td key="created_at" />
          <q-td key="updated_at" />
          <q-td key="actions">
            <q-btn name="new_row" color="primary" icon="add" label="新規作成" @click="" style="width: 190px" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
    
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useWorkLogStore } from "../stores/worklog"
import { WorkLog } from "../stores/interface";
const worklogStore = useWorkLogStore();

const update = ref(false);

type align = "right" | "left" | "center" | undefined;
const columns = [
  {
    name: "date",
    label: "日付",
    field: "date",
    required: true,
    align: "left" as align,
    sortable: true,
  },
  {
    name: "name",
    label: "プロジェクト",
    field: "name",
    align: "left" as align,
    sortable: true,
    required: true,
  },
  {
    name: "title",
    label: "要約",
    field: "title",
    align: "left" as align,
    sortable: false,
    required: true,
  },
  {
    name: "created_at",
    label: "作成日時",
    field: "created_at",
    align: "left" as align,
    sortable: true,
    required: false,
  },
  {
    name: "actions",
    label: "actions",
    field: "actions",
    align: "center" as align,
    sortable: false,
    required: false,
  },
];

const rows = computed(() => {
  return worklogStore.worklogs.map((item: WorkLog) => ({
    id: item.id,
    name: item.name,
    date: item.date,
    created_at: item.created_at,
    title: item.title,
    content: item.content,
  }));
})

const refresh = async () => {
  update.value = true;
  await worklogStore.getWorkLogs();
  update.value = false;
}

onMounted(async () => {
  if (worklogStore.worklogs.length == 0) {
    await worklogStore.setup();
  }
});
</script>  