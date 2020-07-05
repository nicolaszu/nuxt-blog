<template>
  <article>
    <template>
      <header>
        <input v-model="title" placeholder="Title" class="title" type="text" />
      </header>
      <div class="content">
        <client-only>
          <div class="editor">
            <top-menu :editor="editor" />
            <bubble-menu :editor="editor" />
            <editor-content class="editor editor__content" :editor="editor" />
          </div>
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

import BubbleMenu from "@/components/editor/bubbleMenu";
import TopMenu from "@/components/editor/topMenu";

export default {
  components: {
    EditorContent,
    BubbleMenu,
    TopMenu
  },
  data() {
    return {
      editor: null,
      title: "",
      html: ""
    };
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
        this.html = getHTML();
      }
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    // eslint-disable-next-line
    async emitOnPublish() {
      await this.validate();
      this.$emit("publish", { htmlContent: this.html, title: this.title });
    },

    validate() {
      console.log(this.html);
      if (!this.title) {
        const error = "Please enter a title";
        throw error;
      }
      if (!this.html) {
        const error = "Looks like you forgot to write a post";
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
::v-deep .content {
  .ltag__user {
    display: none;
  }
  iframe {
    max-width: 100%;
  }
  h1 {
    font-size: $text-3xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  h2 {
    font-size: $text-2xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  h3 {
    font-size: $text-xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  h4 {
    font-size: $text-base;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  a {
    color: $primary-color;
  }
  p {
    margin-bottom: 1rem;
    line-height: 1.4;
    code {
      background-color: #d2f3e1;
      border-radius: 0.25rem;
      padding: 0.25rem;
    }
  }
  img {
    width: 100%;
    border-radius: 0.5rem;
  }
  .highlight {
    margin-bottom: 1rem;
    border-radius: 0.5rem;
  }

  ul {
    list-style: inherit;
    margin-bottom: 1rem;
    li p {
      margin-bottom: 0;
    }
  }
  ol {
    margin-bottom: 1rem;
    list-style: decimal;
  }
  blockquote {
    border-left: 3px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.8);
    padding-left: 0.8rem;
    font-style: italic;
  }
  pre {
    &::before {
      content: attr(data-language);
      text-transform: uppercase;
      display: block;
      text-align: right;
      font-weight: bold;
      font-size: 0.6rem;
    }
    code {
      .hljs-comment,
      .hljs-quote {
        color: #999999;
      }
      .hljs-variable,
      .hljs-template-variable,
      .hljs-attribute,
      .hljs-tag,
      .hljs-name,
      .hljs-regexp,
      .hljs-link,
      .hljs-name,
      .hljs-selector-id,
      .hljs-selector-class {
        color: #f2777a;
      }
      .hljs-number,
      .hljs-meta,
      .hljs-built_in,
      .hljs-builtin-name,
      .hljs-literal,
      .hljs-type,
      .hljs-params {
        color: #f99157;
      }
      .hljs-string,
      .hljs-symbol,
      .hljs-bullet {
        color: #99cc99;
      }
      .hljs-title,
      .hljs-section {
        color: #ffcc66;
      }
      .hljs-keyword,
      .hljs-selector-tag {
        color: #6699cc;
      }
      .hljs-emphasis {
        font-style: italic;
      }
      .hljs-strong {
        font-weight: 700;
      }
    }
  }
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid $gray-color;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;
      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: 0;
      width: 4px;
      z-index: 20;
      background-color: #adf;
      pointer-events: none;
    }
  }

  .tableWrapper {
    margin: 1em 0;
    overflow-x: auto;
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
</style>
