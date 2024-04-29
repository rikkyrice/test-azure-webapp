import { defineStore } from 'pinia';

export const useViewerStore = defineStore({
  id: 'viewer',
  state: () => {
    return {
      is_error: false as boolean,
      error_title: '' as string,
      error_message: '' as string
    }
  },
  actions: {
    reset() {
      this.is_error = false
      this.error_title = ''
      this.error_message = ''
    },
    handleError(error: any, errorTitle: string) {
      this.is_error = true;
      this.error_title = errorTitle;
      switch (error.response.status) {
        case 500:
          this.error_message = 'Internal Server Error';
          break;
        case 404:
          this.error_message = 'Not Found';
          break;
        default:
          this.error_message = `Error: ${error.response.status}`;
          break;
      }
    }
  }
})