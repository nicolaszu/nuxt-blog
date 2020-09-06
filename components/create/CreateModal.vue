<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div class="h-content">
              <h3>Create Post</h3>
              <p class="h-instructions">
                Select the type of post you would like to create.
              </p>
            </div>
            <button class="h-close-button">
              <closeIcon @click="$emit('close')" />
            </button>
          </div>

          <div class="modal-body">
            <nuxt-link
              to="/create/write"
              class="card-type"
              tag="div"
              @click.native="$emit('close')"
            >
              <notepad-icon />
              <p>Write a post</p>
            </nuxt-link>
            <nuxt-link
              to="/create/share-link"
              class="card-type"
              tag="div"
              @click.native="$emit('close')"
            >
              <share-link-icon />
              <p>Share a Link</p>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import closeIcon from "@/assets/icons/utility/close.svg?inline";
import notepadIcon from "@/assets/icons/graphics/write-notepad.svg?inline";
import shareLinkIcon from "@/assets/icons/graphics/share-link.svg?inline";

export default {
  components: {
    closeIcon,
    notepadIcon,
    shareLinkIcon
  }
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.2s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #f7f9fc;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2.5rem 1.5rem 2.5rem;
}

.modal-body {
  display: flex;
  gap: 32px;
  justify-content: center;
  padding: 1.5rem 2.5rem 3.5rem 2.5rem;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.card-type {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  box-shadow: 0px 2px 4px -2px rgba(24, 39, 75, 0.12),
    0px 4px 4px -2px rgba(24, 39, 75, 0.08);
  padding: 34px 44px;
  border-radius: 5px;
  min-width: 180px;
  height: auto;
  font-size: $text-xs;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 6px 14px -6px rgba(24, 39, 75, 0.12),
      0px 10px 32px -4px rgba(24, 39, 75, 0.1);
    color: $primary-color;
  }
  &:active {
    box-shadow: $small-inner-shadow;
  }
}
.h-instructions {
  font-size: $text-xs;
  color: $gray-color;
}

.h-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.h-close-button {
  align-self: start;

  svg {
    fill: $dark-gray-color;
  }
}
</style>
