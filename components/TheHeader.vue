<template>
  <header :class="[navHide, navShadow]">
    <nav>
      <ul>
        <nuxt-link to="/" class="logo-wrapper">
          Blok.
        </nuxt-link>
        <li v-for="link in links" :key="link.name">
          <nuxt-link
            v-if="!searchOverlay"
            :to="
              link.filter
                ? { name: 'index', query: { filter: link.filter } }
                : { name: 'index' }
            "
          >
            {{ link.name }}
          </nuxt-link>
        </li>
        <searchIcon @click="searchOverlay = true" />
        <template v-if="searchOverlay">
          <input
            ref="search"
            type="text"
            v-model="searchQuery"
            placeholder="Search Blok..."
            @keyup.enter="search()"
          />
          <closeIcon class="bigger-svg" @click="searchOverlay = false" />
        </template>
      </ul>
      <nuxt-link to="create" tag="span">
        Write a Post
        <penIcon />
      </nuxt-link>
    </nav>
    <transition name="fade" duration="2000">
      <div
        v-if="searchOverlay"
        class="overlay-search"
        @click="searchOverlay = false"
      />
    </transition>
  </header>
</template>

<script>
import penIcon from "@/assets/icons/pen.svg?inline";
import searchIcon from "@/assets/icons/search.svg?inline";
import closeIcon from "@/assets/icons/close.svg?inline";

export default {
  components: { penIcon, searchIcon, closeIcon },
  data() {
    return {
      links: [
        {
          name: "Home",
          filter: ""
        },
        {
          name: "News",
          filter: "top=365"
        }
      ],
      scrollPosition: 0,
      lastScrollPosition: 0,
      headerIsHidden: false,
      headerHasShadow: false,
      searchOverlay: false,
      searchQuery: ""
    };
  },
  computed: {
    navHide() {
      return this.headerIsHidden ? "navHide" : "";
    },
    navShadow() {
      return this.headerHasShadow ? "navShadow" : "";
    }
  },
  watch: {
    searchOverlay(open) {
      if (open) {
        this.$nextTick(() => this.$refs.search.focus());
      }
    }
  },
  created() {
    if (process.client) {
      // eslint-disable-next-line
      window.addEventListener("scroll", this.handleScroll);
      // eslint-disable-next-line
      window.addEventListener("keydown", this.handleEscape);
      this.headerHasShadow = false;
    }
  },
  destroyed() {
    // eslint-disable-next-line
    if (process.client) {
      window.removeEventListener("scroll", this.handleScroll);
      window.removeEventListener("keydown", this.handleEscape);
    }
  },
  methods: {
    handleScroll() {
      this.lastScrollPosition = this.scrollPosition;
      this.scrollPosition = window.scrollY;
      if (
        this.lastScrollPosition < this.scrollPosition &&
        this.scrollPosition > 100
      ) {
        this.headerIsHidden = true;
        this.searchOverlay = false;
      } else {
        this.headerIsHidden = false;
        if (this.scrollPosition <= 30) {
          this.headerHasShadow = false;
        } else {
          this.headerHasShadow = true;
        }
      }
    },
    handleEscape(e) {
      if (e.key === "Escape" && this.searchOverlay) {
        this.searchOverlay = false;
      }
    },
    search() {
      if (this.searchQuery) {
        this.searchOverlay = false;
        this.$router.push({
          name: "search",
          query: { search: this.searchQuery }
        });
      }
      this.searchQuery = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.navHide {
  transform: translateY(-100%);
  box-shadow: none;
}

.navShadow {
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
}

header {
  max-width: 100%;
  width: 100%;
  position: fixed;
  background: hsla(0, 0%, 100%, 0.98) !important;
  z-index: 10;
  padding: 0.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.2s linear, box-shadow 0.2s ease;
  span {
    cursor: pointer;
    letter-spacing: $-ls2;
    font-weight: $display-font-weight;
    font-size: $text-sm;
    display: flex;
    padding: 0.5rem 0.5rem;
    border-radius: 0.2rem;
    user-select: none;
    //background: $primary-light;
    &:hover {
      background: $primary-light;
    }
    svg {
      margin-left: 0.5rem;
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  .logo-wrapper {
    cursor: default;
    letter-spacing: $-ls2;
    font-weight: $display-font-weight;
    font-size: $text-lg;
    display: flex;
    margin-right: 3rem;
  }
  nav {
    display: flex;
    justify-content: space-between;
    max-width: $screen-xl;
    margin: auto;
    letter-spacing: $-ls2;
    font-size: $text-sm;
    width: calc(100% - 2 * 1rem);
    @media (min-width: $screen-sm) {
      width: $screen-sm;
    }
    @media (min-width: $screen-lg) {
      width: 1200px;
    }
    ul {
      align-self: center;
      display: flex;
      align-items: center;
      li {
        margin: 0 0.5rem;

        a {
          padding: 0.5rem 0.5rem;
          user-select: none;
          &:hover {
            border-bottom: 3px solid $gray-color;
          }
          &.nuxt-link-exact-active {
            cursor: default;
            border-bottom: 3px solid;
          }
          &:active {
            background: transparent;
          }
        }
      }
      svg {
        width: 16px;
        height: 16px;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        cursor: pointer;
      }
      .bigger-svg {
        width: 24px;
        height: 24px;
      }
      input {
        font-size: $text-xs;
      }
    }
  }
}
.overlay-search {
  opacity: 0.3;
  background: #000;
  width: 100%;
  height: 100vh;
  z-index: 10;
  top: 3.5rem;
  left: 0;
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
