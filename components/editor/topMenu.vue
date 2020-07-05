<template>
  <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
    <div class="menubar">
      <button
        class="menubar__button"
        :class="{ active: isActive.paragraph() }"
        @click="commands.paragraph"
      >
        <paragraph-icon />
      </button>
      <button
        class="menubar__button"
        :class="{ active: isActive.heading({ level: 1 }) }"
        @click="commands.heading({ level: 1 })"
      >
        <header-1-icon />
      </button>

      <button
        class="menubar__button"
        :class="{ active: isActive.heading({ level: 2 }) }"
        @click="commands.heading({ level: 2 })"
      >
        <header-2-icon />
      </button>

      <button
        class="menubar__button"
        :class="{ active: isActive.heading({ level: 3 }) }"
        @click="commands.heading({ level: 3 })"
      >
        <header-3-icon />
      </button>

      <button
        class="menubar__button"
        :class="{ active: isActive.bold() }"
        @click="commands.bold"
      >
        <bold-icon />
      </button>
      <button
        class="menubar__button"
        :class="{ active: isActive.italic() }"
        @click="commands.italic"
      >
        <italics-icon />
      </button>

      <button
        class="menubar__button"
        :class="{ active: isActive.strike() }"
        @click="commands.strike"
      >
        <strike-icon />
      </button>

      <button
        class="menubar__button"
        :class="{ active: isActive.underline() }"
        @click="commands.underline"
      >
        <underline-icon />
      </button>

      <button
        class="menubar__button"
        :class="{ active: isActive.bullet_list() }"
        @click="commands.bullet_list"
      >
        <list-unorder-icon />
      </button>

      <button
        class="menubar__button"
        :class="{ active: isActive.ordered_list() }"
        @click="commands.ordered_list"
      >
        <list-order-icon />
      </button>

      <button
        class="menubar__button"
        :class="{ active: isActive.blockquote() }"
        @click="commands.blockquote"
      >
        <quotes-icon />
      </button>

      <button
        class="menubar__button"
        :class="{ active: isActive.code_block() }"
        @click="commands.code_block"
      >
        <code-icon />
      </button>

      <button class="menubar__button" @click="commands.horizontal_rule">
        <Seperator-icon />
      </button>

      <button class="menubar__button" @click="commands.undo">
        <undo-icon />
      </button>

      <button class="menubar__button" @click="commands.redo">
        <redo-icon />
      </button>
      <button
        class="menubar__button"
        @click="
          commands.createTable({
            rowsCount: 3,
            colsCount: 3,
            withHeaderRow: false
          })
        "
      >
        <table-icon />
      </button>

      <span v-if="isActive.table()">
        <button class="menubar__button" @click="commands.deleteTable">
          <delete-table />
        </button>
        <button class="menubar__button" @click="commands.addColumnBefore">
          <add-col-before />
        </button>
        <button class="menubar__button" @click="commands.addColumnAfter">
          <add-col-after />
        </button>
        <button class="menubar__button" @click="commands.deleteColumn">
          <delete-col />
        </button>
        <button class="menubar__button" @click="commands.addRowBefore">
          <add-row-before />
        </button>
        <button class="menubar__button" @click="commands.addRowAfter">
          <add-row-after />
        </button>
        <button class="menubar__button" @click="commands.deleteRow">
          <delete-row />
        </button>
        <button class="menubar__button" @click="commands.toggleCellMerge">
          <combine-cells />
        </button>
      </span>
    </div>
  </editor-menu-bar>
</template>

<script>
import { EditorMenuBar } from "tiptap";

import QuotesIcon from "@/assets/icons/editor/quotes.svg?inline";
import BoldIcon from "@/assets/icons/editor/bold.svg?inline";
import Header1Icon from "@/assets/icons/editor/header1.svg?inline";
import Header2Icon from "@/assets/icons/editor/header2.svg?inline";
import Header3Icon from "@/assets/icons/editor/header3.svg?inline";
import listUnorderIcon from "@/assets/icons/editor/listUnorder.svg?inline";
import listOrderIcon from "@/assets/icons/editor/listOrder.svg?inline";
import codeIcon from "@/assets/icons/editor/code.svg?inline";
import UnderlineIcon from "@/assets/icons/editor/underline.svg?inline";
import SeperatorIcon from "@/assets/icons/editor/seperator.svg?inline";
import StrikeIcon from "@/assets/icons/editor/strike.svg?inline";
import ItalicsIcon from "@/assets/icons/editor/italics.svg?inline";
import RedoIcon from "@/assets/icons/editor/redo.svg?inline";
import UndoIcon from "@/assets/icons/editor/undo.svg?inline";
import ParagraphIcon from "@/assets/icons/editor/paragraph.svg?inline";
import TableIcon from "@/assets/icons/editor/table.svg?inline";
import deleteTable from "@/assets/icons/editor/deleteTable.svg?inline";
import addColAfter from "@/assets/icons/editor/addColAfter.svg?inline";
import addColBefore from "@/assets/icons/editor/addColBefore.svg?inline";
import addRowAfter from "@/assets/icons/editor/addRowAfter.svg?inline";
import addRowBefore from "@/assets/icons/editor/addRowBefore.svg?inline";
import deleteCol from "@/assets/icons/editor/deleteCol.svg?inline";
import deleteRow from "@/assets/icons/editor/deleteRow.svg?inline";
import combineCells from "@/assets/icons/editor/combineCells.svg?inline";

export default {
  components: {
    EditorMenuBar,
    QuotesIcon,
    BoldIcon,
    Header1Icon,
    Header2Icon,
    Header3Icon,
    listUnorderIcon,
    listOrderIcon,
    codeIcon,
    UnderlineIcon,
    SeperatorIcon,
    StrikeIcon,
    ItalicsIcon,
    RedoIcon,
    UndoIcon,
    ParagraphIcon,
    TableIcon,
    addColAfter,
    addColBefore,
    addRowAfter,
    addRowBefore,
    deleteTable,
    deleteCol,
    deleteRow,
    combineCells
  },
  props: {
    editor: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  background: $primary-light;
  border-radius: 5px;
}

.menubar__button {
  padding: 5px;
}
</style>
