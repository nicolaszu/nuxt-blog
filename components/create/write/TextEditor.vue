<template>
  <article>
    <template>
      <header>
        <!-- eslint-disable -->
        <!-- weird glitch here, using mutableContent.title throws error <!-->
        <input
          v-model="titleComputed"
          placeholder="Title"
          class="title"
          type="text"
        />
        <!-- eslint-enable -->
      </header>
      <div class="content">
        <client-only>
          <div class="editor">
            <top-menu-bar :editor="editor" />
            <bubble-menu :editor="editor" />
            <editor-content class="editor editor__content" :editor="editor" />
          </div>
          <content-placeholders class="editor" rounded slot="placeholder">
            <content-placeholders-text :lines="10" />
          </content-placeholders>
        </client-only>
      </div>
    </template>
  </article>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import {
  Blockquote,
  CodeBlockHighlight,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  CodeBlock,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Placeholder,
  Table,
  TableHeader,
  TableCell,
  TableRow
} from "tiptap-extensions";

import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import scss from "highlight.js/lib/languages/scss";
import python from "highlight.js/lib/languages/python";
import sql from "highlight.js/lib/languages/sql";
import json from "highlight.js/lib/languages/json";
import django from "highlight.js/lib/languages/django";
import yaml from "highlight.js/lib/languages/yaml";
import htmlbars from "highlight.js/lib/languages/htmlbars";

import bubbleMenu from "@/components/create/write/menus/BubbleMenu";
import topMenuBar from "@/components/create/write/menus/topMenuBar";
import editPost from "@/mixins/editPost";
export default {
  mixins: [editPost],
  components: {
    EditorContent,
    bubbleMenu,
    topMenuBar
  },
  data() {
    return {
      editor: null,
      title: "",
      html: ""
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
    htmlComputed: {
      get() {
        return this.isEditing ? this.mutableContent.htmlContent : this.html;
      },
      set(val) {
        if (this.isEditing) {
          this.mutableContent.htmlContent = val;
        } else {
          this.html = val;
        }
      }
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new HorizontalRule(),
        new Strike(),
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new CodeBlockHighlight({
          languages: {
            javascript,
            css,
            scss,
            python,
            django,
            sql,
            json,
            yaml,
            htmlbars
          }
        }),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new History(),
        new Underline(),
        new Placeholder({
          showOnlyCurrent: true,
          emptyNodeText: "Write something"
        }),
        new Table({
          resizable: true
        }),
        new TableHeader(),
        new TableCell(),
        new TableRow()
      ],
      onUpdate: ({ getHTML }) => {
        this.htmlComputed = getHTML();
      }
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    // eslint-disable-next-line
    async emitOnSave() {
      await this.validate();
      this.$emit("save", {
        htmlContent: this.htmlComputed,
        title: this.titleComputed,
        type: "WRITE"
      });
    },
    validate() {
      if (!this.titleComputed) {
        const error = "Please enter a title";
        throw error;
      }
      if (!this.htmlComputed) {
        const error = "Looks like you forgot to write a post";
        throw error;
      }
    }
  },
  watch: {
    "editContent.htmlContent"() {
      this.editor.setContent(this.htmlComputed);
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
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
    .tag {
      font-weight: $bold-body-font-weight;
      line-height: 1;
      padding: 0.5rem 0.5rem;
      margin: 0 0.5rem 0.5rem 0;
      border-radius: 0.25rem;
      box-shadow: $small-shadow;
      &:hover {
        background: $hovered-surface-color;
      }
      &:active {
        background: transparent;
        box-shadow: $small-inner-shadow;
      }
    }
  }
  .image-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    background-color: $primary-dark;
    margin-bottom: 1.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
    @media (min-width: $screen-md) {
      margin-bottom: 1.5rem;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .meta {
    line-height: 1;
    font-size: $text-sm;
    text-transform: uppercase;
    font-weight: $bold-body-font-weight;
    letter-spacing: $-ls2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .scl {
      display: flex;
      span {
        display: flex;
        align-items: center;
        margin-right: 1rem;
        svg {
          margin-right: 0.25rem;
        }
      }
      .comments {
        cursor: pointer;
      }
    }
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

.editor__content {
  background: white;
  padding: 48px 0px;
  border-radius: 10px;
  min-height: 100vh;
}

input:focus {
  outline: none;
}

::v-deep .editor *.is-empty:nth-child(1)::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
  outline: none;
}

::v-deep .ProseMirror:focus {
  outline: none;
}

::v-deep .vue-content-placeholders-text__line {
  width: 100% !important;
  padding: 0.5rem;
  border-radius: 6px;
  margin-bottom: 10px;
}
</style>
