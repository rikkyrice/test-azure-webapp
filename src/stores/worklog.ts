import { defineStore } from 'pinia';
import { WorkLog } from './interface';
import { useViewerStore } from './viewer';
// import { v4 as uuidv4 } from 'uuid';

import axios from "axios";

// axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;

export const useWorkLogStore = defineStore({
  id: 'worklog',
  state: () => {
    return {
      worklogs: [] as WorkLog[],
    }
  },
  // getters: {
  //     selected_worklog: (state) => (state.worklogs.find((each) => (each._id == state.selected_example_id)))
  // },
  actions: {
    async setup() {
      await this.getWorkLogs();
    },
    async getWorkLogs() {
      const viewer_store = useViewerStore();
      try {
        // const response = await axios.get("https://worklogs-test-20240428.azurewebsites.net/api/HTTPExample");
        const response = await axios.get("/api/items");
        this.worklogs = response.data;
      } catch (error: any) {
        viewer_store.handleError(error, '参考ドキュメント取得中にエラーが発生しました。');
      }
    },
    // async postExample(new_example_doc: ExampleDoc) {
    //     const viewer_store = useViewerStore();
    //     try {
    //         const response = await axios.post("/api/example-documents", new_example_doc);
    //         new_example_doc._id = response.data.inserted_id;
    //         this.example_docs.push(new_example_doc);
    //         console.log("createDoc", response)
    //     } catch (error: any) {
    //         viewer_store.handleError(error, 'ドキュメント保存中にエラーが発生しました。');
    //     }
    // },
    // async putExample(update_example_doc: ExampleDoc) {
    //     const viewer_store = useViewerStore();
    //     try {
    //         const response = await axios.put("/api/example-documents/" + update_example_doc._id, update_example_doc);
    //         this.example_docs = this.example_docs.filter((each: ExampleDoc) => (each._id != update_example_doc._id))
    //         this.example_docs.push(update_example_doc);
    //         console.log("updateDoc", response)
    //     } catch (error: any) {
    //         viewer_store.handleError(error, 'ドキュメント更新中にエラーが発生しました。');
    //     }
    // },
    // async deleteExample(_id: string) {
    //     const viewer_store = useViewerStore();
    //     try {
    //         const response = await axios.delete("/api/example-documents/" + _id);
    //         this.example_docs = this.example_docs.filter((each: ExampleDoc) => (each._id != _id))
    //         console.log("deleteDoc", response)
    //     } catch (error: any) {
    //         viewer_store.handleError(error, '参考ドキュメント削除中にエラーが発生しました。');
    //     }
    // }
  }
})