<template>
  <aside>
    <template>
      <div :class="{ required: !authorComputed && validating }">
        <p class="section-title">* Author</p>
        <!-- eslint-disable -->
        <input v-model="authorComputed" type="text" class="width-100" />
        <!-- eslint-enable -->
      </div>

      <div
        :class="{
          required: !descriptionComputed && validating,
          error: maxDescriptionReached
        }"
      >
        <span class="section-title ">
          * Description
          <div>
            <span v-if="maxDescriptionReached" class="error">Too long</span>
            <span>
              ({{ descriptionComputed.length }}/{{ maxDescription }})
            </span>
          </div>
        </span>
        <!-- eslint-disable -->
        <textarea
          v-model="descriptionComputed"
          class="width-100"
          name="description"
          rows="3"
          :placeholder="`Max ${maxDescription} Characters`"
        />
        <!-- eslint-disable -->
      </div>

      <div>
        <span class="section-title ">
          Tags
          <div>
            <span v-if="maxTagsReached" class="complete">limit reached</span>
            <span :class="{ complete: maxTagsReached }">
              ({{ tagsComputed.length }}/{{ maxTags }})
            </span>
          </div>
        </span>
        <client-only>
          <vue-tags-input
            ref="tag_input"
            v-model="tag"
            :max-tags="maxTags"
            @tags-changed="updateTags"
            :tags="tagsComputed"
          />
          <content-placeholders rounded slot="placeholder">
            <content-placeholders-text :lines="1" />
          </content-placeholders>
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
          @vdropzone-removed-file="imageDeleted"
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
import AddFileIcon from "@/assets/icons/editor-menu/addFile.svg?inline";
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
      maxDescription: 100,
      noEditedImage: false
    };
  },
  computed: {
    maxTagsReached() {
      if (this.tagsComputed.length === this.maxTags) {
        return true;
      }
      return false;
    },
    maxDescriptionReached() {
      if (this.descriptionComputed.length > this.maxDescription) {
        return true;
      }
      return false;
    },
    authorComputed: {
      get() {
        return this.isEditing
          ? this.mutableContent.author
          : this.postMeta.author;
      },
      set(val) {
        if (this.isEditing) {
          this.mutableContent.author = val;
        } else {
          this.postMeta.author = val;
        }
      }
    },
    descriptionComputed: {
      get() {
        return this.isEditing
          ? this.mutableContent.description
          : this.postMeta.description;
      },
      set(val) {
        if (this.isEditing) {
          this.mutableContent.description = val;
        } else {
          this.postMeta.description = val;
        }
      }
    },
    tagsComputed: {
      get() {
        return this.isEditing ? this.mutableContent.tags : this.postMeta.tags;
      },
      set(val) {
        if (this.isEditing) {
          this.mutableContent.tags = val;
        } else {
          this.postMeta.tags = val;
        }
      }
    },
    dateCreatedComputed: {
      get() {
        return this.isEditing
          ? this.mutableContent.dateCreated
          : this.postMeta.dateCreated;
      },
      set(val) {
        if (this.isEditing) {
          // Do not override if editing
        } else {
          this.postMeta.dateCreated = val;
        }
      }
    },
    coverImageComputed: {
      get() {
        return this.isEditing
          ? this.mutableContent.coverImage
          : this.postMeta.coverImage;
      },
      set(val) {
        if (this.isEditing) {
          this.mutableContent.coverImage = val;
        } else {
          this.postMeta.coverImage = val;
        }
      }
    }
  },
  watch: {
    maxTagsReached(isMax) {
      console.log(isMax);
      this.$refs.tag_input.$refs.newTagInput.placeholder = isMax
        ? ""
        : "Add Tag";
    },
    "editContent.coverImage"() {
      if (this.mutableContent.coverImage) {
        // const mockFile = { name: "Filename", size: 12345 };
        const file = { size: 123, name: "Icon", type: "image/png" };
        this.$refs.el.manuallyAddFile(file, this.mutableContent.coverImage);
      }
    }
  },
  mounted() {
    // eslint-disable-next-line
    const instance = this.$refs.el.dropzone;
  },
  methods: {
    updateTags(tags) {
      this.tagsComputed = tags.map((tag) => tag.text);
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
    imageAdded(file) {
      this.fileImage = file;
      if (this.isEditing) {
        this.noEditedImage = false;
      }
    },
    imageDeleted() {
      if (this.isEditing) {
        this.noEditedImage = true;
      }
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
    async emitOnSave() {
      await this.validate();
      if (this.fileImage && !this.fileImage.manuallyAdded) {
        this.coverImageComputed = await this.uploadImageAzure(this.fileImage);
      }
      if (this.noEditedImage) {
        this.coverImageComputed = "Delete"; // Notifies backend that image must be delete. Do not change 'Delete', it looks for exact match.
      }
      this.dateCreatedComputed = this.$moment().format("yyyy-MM-DD");
      this.$emit("save", {
        author: this.authorComputed,
        description: this.descriptionComputed,
        coverImage: this.coverImageComputed,
        dateCreated: this.dateCreatedComputed,
        tags: this.tagsComputed
      });
    },
    validate() {
      this.validating = true;
      if (!this.authorComputed || !this.descriptionComputed) {
        const err = "Please fill in details";
        throw err;
      } else if (this.maxDescriptionReached) {
        const err = "Description is too long";
        throw err;
      }
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
    .warning {
      color: red;
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

::v-deep .vue-content-placeholders-text__line {
  width: 100% !important;
  padding: 1rem;
  border-radius: 6px;
}
</style>
