<template>
  <div class="container">
    <h1 class="title">Claude 3 Image Description</h1>
    <div class="card">
      <textarea v-model="message" placeholder="メッセージを入力してください" class="textarea"></textarea>
      <div class="file-input-wrapper">
        <label for="file-input" class="file-input-label">
          <span class="file-input-text">画像を選択</span>
          <input id="file-input" type="file" @change="onFileChange" accept="image/*" class="file-input">
        </label>
        <span v-if="imageFile" class="file-name">{{ imageFile.name }}</span>
      </div>
      <button @click="sendRequest" :disabled="isLoading" class="button" :class="{ 'is-loading': isLoading }">
        {{ isLoading ? '処理中...' : '送信' }}
      </button>
    </div>
    <div v-if="response" class="card response-card">
      <h2 class="subtitle">応答:</h2>
      <pre>{{ response }}</pre>
    </div>
    <div v-if="error" class="card error-card">
      <h2 class="subtitle">エラー:</h2>
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: '',
      imageFile: null,
      response: '',
      error: '',
      isLoading: false,
    };
  },
  methods: {
    onFileChange(event) {
      this.imageFile = event.target.files[0];
    },
    async sendRequest() {
      this.isLoading = true;
      this.response = '';
      this.error = '';

      try {
        const formData = new FormData();
        formData.append('message', this.message);
        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }

        const response = await axios.post('/api/claude', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.response = response.data.response;
      } catch (error) {
        this.error = error.response?.data?.message || 'エラーが発生しました';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* GitHub-like theme and modern styling */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;
  background-color: #f6f8fa;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.card {
  background-color: #ffffff;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 0 rgba(27,31,35,0.04);
}

.textarea {
  width: 97.5%;
  height: 100px;
  padding: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  resize: vertical;
}

.file-input-wrapper {
  margin-bottom: 16px;
}

.file-input-label {
  display: inline-block;
  padding: 6px 12px;
  background-color: #fafbfc;
  border: 1px solid rgba(27,31,35,0.15);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #24292e;
  cursor: pointer;
}

.file-input {
  display: none;
}

.file-name {
  margin-left: 8px;
  font-size: 14px;
}

.button {
  background-color: #2ea44f;
  color: #ffffff;
  border: 1px solid rgba(27,31,35,0.15);
  border-radius: 6px;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #2c974b;
}

.button:disabled {
  background-color: #94d3a2;
  cursor: not-allowed;
}

.button.is-loading {
  opacity: 0.8;
}

.response-card {
  background-color: #f1f8ff;
}

.error-card {
  background-color: #ffeef0;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: 0;
}

</style>
