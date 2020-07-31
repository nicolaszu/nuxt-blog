<template>
  <aside>
    <template>
      <div :class="{ required: !postMeta.author && validating }">
        <p class="section-title">* Author</p>
        <!-- eslint-disable -->
        <input
          v-model="editContent ? mutableContent.author : postMeta.author"
          type="text"
          class="width-100"
        />
        <!-- eslint-enable -->
      </div>

      <div
        :class="{
          required: !postMeta.description && validating,
          error: maxDescriptionReached
        }"
      >
        <span class="section-title ">
          * Description
          <div>
            <span v-if="maxDescriptionReached" class="error">Too long</span>
            <span>
              ({{ postMeta.description.length }}/{{ maxDescription }})
            </span>
          </div>
        </span>
        <!-- eslint-disable -->
        <textarea
          v-model="
            editContent ? mutableContent.description : postMeta.description
          "
          class="width-100"
          name="description"
          rows="3"
          :placeholder="`Max ${maxDescription} Characters`"
        />
        <!-- eslint-disable -->
      </div>

      <div>
        <client-only>
          <span @click="addExistingTags" class="section-title ">
            Tags
            <div>
              <span v-if="maxTagsReached" class="complete">limit reached</span>
              <span :class="{ complete: maxTagsReached }">
                ({{ postMeta.tags.length }}/{{ maxTags }})
              </span>
            </div>
          </span>
          <vue-tags-input
            ref="tag_input"
            v-model="tag"
            :max-tags="maxTags"
            @tags-changed="updateTags"
          />
        </client-only>
      </div>

      <div>
        <p class="section-title">Cover Image</p>
        <dropzone
          id="foo"
          ref="el"
          :options="options"
          :destroyDropzone="true"
          :use-custom-content="true"
          @vdropzone-file-added="imageAdded"
        >
          <div class="dropzone-custom-content">
            <add-file-icon />
            <h3 class="dropzone-custom-title">
              Drag and drop
            </h3>
            <div class="subtitle">
              or<span class="browse"> browse </span>your images
            </div>
          </div>
        </dropzone>
      </div>
    </template>
  </aside>
</template>

<script>
import Dropzone from "nuxt-dropzone";
import "nuxt-dropzone/dropzone.css";
import AddFileIcon from "@/assets/icons/editor/addFile.svg?inline";
import editPost from "@/mixins/editPost";

let VueTagsInput;
if (process.client) {
  VueTagsInput = require("@johmun/vue-tags-input").default;
}

export default {
  mixins: [editPost],

  components: {
    Dropzone,
    AddFileIcon,
    VueTagsInput
  },
  data() {
    return {
      options: {
        url: "http://httpbin.org/anything", // required by library unfortunately
        maxFiles: 1,
        addRemoveLinks: true,
        thumbnailWidth: 350,
        thumbnailHeight: 150,
        acceptedFiles: [".jpeg", ".jpg", ".png"]
      },
      tag: "",
      maxTags: 5,
      fileImage: null,
      postMeta: {
        author: "",
        description: "",
        tags: [],
        dateCreated: ""
      },
      validating: false,
      maxDescription: 100
    };
  },
  computed: {
    maxTagsReached() {
      if (this.postMeta.tags.length === this.maxTags) {
        return true;
      }
      return false;
    },
    maxDescriptionReached() {
      if (this.postMeta.description.length > this.maxDescription) {
        return true;
      }
      return false;
    }
  },
  watch: {
    maxTagsReached(isMax) {
      console.log(isMax);
      this.$refs.tag_input.$refs.newTagInput.placeholder = isMax
        ? ""
        : "Add Tag";
    }
  },
  mounted() {
    // eslint-disable-next-line
    const instance = this.$refs.el.dropzone;
  },
  methods: {
    updateTags(tags) {
      this.postMeta.tags = tags.map((tag) => tag.text);
    },
    removeTags() {
      for (
        let index = this.$refs.tag_input.tagsCopy.length - 1;
        index >= 0;
        index--
      ) {
        this.$refs.tag_input.deleteTag(index);
      }
    },
    addExistingTags() {
      console.log(this.$refs.tag_input);
      this.mutableContent.tags.forEach((tag) => {
        console.log(this.$refs.tag_input);
      });
    },
    imageAdded(file) {
      this.fileImage = file;
    },
    async uploadImageAzure(fileToUpload) {
      const time = this.$moment().unix();
      const random = Math.floor(Math.random() * Math.floor(10000));
      const imgName = fileToUpload.name
        .replace(/\.[^/.]+$/, "")
        .replace(/\s/g, "");
      const extension = fileToUpload.name.split(".").pop();

      const config = {
        baseUrl: `${process.env.baseUrl}${random}${imgName}${time}.${extension}`,
        sasToken: process.env.sasToken,
        file: this.fileImage,
        progress: (e) => console.log("progerss"),
        complete: (e) => console.log("completed"),
        error: (e) => console.log("error")
      };

      await this.$azureUpload(config, this.$http);
      return `${process.env.baseUrl}${random}${imgName}${time}.${extension}`;
    },
    async emitOnPublish() {
      await this.validate();
      if (this.fileImage) {
        this.postMeta.coverImage = await this.uploadImageAzure(this.fileImage);
      }
      this.postMeta.dateCreated = this.$moment().format("yyyy-MM-DD");
      this.$emit("publish", this.postMeta);
    },

    validate() {
      this.validating = true;
      if (!this.postMeta.author || !this.postMeta.description) {
        const err = "Please fill in details";
        throw err;
      } else if (this.maxDescriptionReached) {
        const err = "Description is too long";
        throw err;
      }
    },
    clearContent() {
      Object.assign(this.$data, this.$options.data.apply(this));
      this.$refs.el.dropzone.removeAllFiles();
      this.removeTags();
    }
  }
};
</script>

<style lang="scss" scoped>
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
.complete {
  color: #71b871;
}

.dropzone-custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    height: auto;
    width: 10%;
    color: $primary-dark;
  }
  .subtitle {
    font-size: $text-xs;
    .browse {
      color: $primary-color;
    }
  }
}
::v-deep .vue-dropzone {
  border: dashed $gray-color 1px;
  border-radius: 5px;
}

.width-100 {
  width: 100%;
}

input,
textarea {
  padding: 0.5rem 0.5rem;
  border-radius: 5px;
  border: 1px solid $gray-color;
  font-size: $text-xs;
  &:focus {
    outline: none;
  }
}

.tags {
  display: flex;
  align-items: center;
  color: $primary-color;
  font-size: $text-sm;
  cursor: pointer;
  svg {
    margin-right: 8px;
  }
}

::v-deep .ti-tag {
  background-color: #e1e1e1;
  color: $on-surface-color;
  border-radius: 2px;
  display: flex;
  padding: 0.5rem;
  margin: 4px;
  font-size: 0.85em;
}

::v-deep .ti-input {
  border: none;
  border-radius: 5px;
  padding: 0.35rem;
  border: 1px solid $gray-color;
  font-size: $text-sm;
}

.required input,
.required textarea {
  border: 1px solid red;
}

.required p,
.required span {
  color: red;
}

.error input,
.error textarea {
  border: 1px solid red;
}

.error p,
.error span {
  color: red;
}
</style>
