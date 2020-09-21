<template>
  <article>
    <template>
      <header>
        <input
          v-model="titleComputed"
          placeholder="Title"
          class="title"
          type="text"
        />
        <!-- eslint-enable -->
      </header>
      <div :class="{ required: !urlComputed && validating }">
        <p class="section-title">* URL</p>
        <!-- eslint-disable -->
        <input
          v-model="urlComputed"
          type="url"
          placeholder="https://example.com/"
          class="input-link "
          :class="{ 'valid-url': validateURL }"
        />
        <!-- eslint-enable -->
      </div>
    </template>
  </article>
</template>

<script>
import editPost from "@/mixins/editPost";
export default {
  mixins: [editPost],
  components: {},
  data() {
    return {
      title: "",
      url: "",
      validating: false
    };
  },
  computed: {
    titleComputed: {
      get() {
        return this.isEditing ? this.mutableContent.title : this.title;
      },
      set(val) {
        if (this.isEditing) {
          this.mutableContent.title = val;
        } else {
          this.title = val;
        }
      }
    },
    urlComputed: {
      get() {
        return this.isEditing ? this.mutableContent.url : this.url;
      },
      set(val) {
        if (this.isEditing) {
          this.mutableContent.url = val;
        } else {
          this.url = val;
        }
      }
    },
    validateURL: {
      get() {
        if (!this.urlComputed) {
          return false;
        }
        const regex = new RegExp(
          "^" +
            // protocol identifier (optional)
            // short syntax // still required
            "(?:(?:(?:https?|ftp):)?\\/\\/)" +
            // user:pass BasicAuth (optional)
            "(?:\\S+(?::\\S*)?@)?" +
            "(?:" +
            // IP address exclusion
            // private & local networks
            "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
            "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
            "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broadcast addresses
            // (first & last IP address of each class)
            "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
            "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
            "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
            "|" +
            // host & domain names, may end with dot
            // can be replaced by a shortest alternative
            // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
            "(?:" +
            "(?:" +
            "[a-z0-9\\u00a1-\\uffff]" +
            "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
            ")?" +
            "[a-z0-9\\u00a1-\\uffff]\\." +
            ")+" +
            // TLD identifier name, may end with dot
            "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
            ")" +
            // port number (optional)
            "(?::\\d{2,5})?" +
            // resource path (optional)
            "(?:[/?#]\\S*)?" +
            "$",
          "i"
        );
        return this.urlComputed.match(regex);
      }
    }
  },

  methods: {
    // eslint-disable-next-line
    async emitOnSave() {
      await this.validate();
      this.$emit("save", {
        title: this.titleComputed,
        urlContent: this.urlComputed,
        type: "LINK"
      });
    },
    validate() {
      this.validating = true;
      if (!this.titleComputed) {
        const error = "Please enter a title";
        throw error;
      }
      if (!this.validateURL) {
        const error = "Please enter a valid URL";
        throw error;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
article {
  padding: 0.5rem;
  border-radius: 1rem;
}
header {
  margin-bottom: 1rem;
  h1 {
    font-size: $text-3xl;
    letter-spacing: $-ls2;
    margin-bottom: 1rem;
  }
}

.title {
  padding: 20px 0px 20px 0px;
  border-radius: 10px;
  margin-bottom: 16px;
  width: 100%;
  font-weight: $display-font-weight;
  font-size: $text-4xl;
}

.input-link {
  padding: 0.5rem 0.5rem;
  border-radius: 5px;
  border: 1px solid $gray-color;
  font-size: $text-xs;
  &:focus {
    outline: none;
  }
  width: 100%;
}

input:focus {
  outline: none;
}

.required input {
  border: 1px solid red;
}

.required p,
.required span {
  color: red;
}

.error input {
  border: 1px solid red;
}

.error p,
.error span {
  color: red;
}

.section-title {
  font-size: $text-ss;
  letter-spacing: $-ls1;
  font-weight: $bold-body-font-weight;
  color: $gray-color;
  text-transform: uppercase;
  margin-bottom: 0.1rem;
  margin-top: 1rem;
  justify-content: space-between;
  display: flex;
}

.valid-url {
  color: $primary-color !important;
  text-decoration: underline;
}
</style>
