<template>
  <editor-menu-bubble
    v-slot="{ commands, isActive, menu }"
    :editor="editor"
    :keep-in-bounds="true"
  >
    <div
      class="menububble"
      :class="{ 'is-active': menu.isActive }"
      :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
    >
      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.bold() }"
        @click="commands.bold"
      >
        <bold-icon />
      </button>

      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.italic() }"
        @click="commands.italic"
      >
        <italics-icon />
      </button>

      <button
        class="menububble__button"
        :class="{ 'is-active': isActive.underline() }"
        @click="commands.underline"
      >
        <underline-icon />
      </button>
    </div>
  </editor-menu-bubble>
</template>

<script>
import { EditorMenuBubble } from "tiptap";
import BoldIcon from "@/assets/icons/editor-menu/bold.svg?inline";
import ItalicsIcon from "@/assets/icons/editor-menu/italics.svg?inline";
import UnderlineIcon from "@/assets/icons/editor-menu/underline.svg?inline";

export default {
  components: { BoldIcon, EditorMenuBubble, ItalicsIcon, UnderlineIcon },
  props: {
    editor: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: black;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  &__button {
    display: inline-flex;
    background: lightgrey;
    border: 0;
    color: white;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: white;
    }

    &.is-active {
      background-color: white;
    }
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    font: inherit;
    border: none;
    background: transparent;
    color: white;
  }
}
</style>
