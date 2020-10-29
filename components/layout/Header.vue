<template>
  <header
    :class="[navHide, navShadow]"
    class="w-full fixed z-10 py-2 px-12 flex items-center justify-between bg-white"
  >
    <create-modal v-show="modalCreateShow" @close="modalCreateShow = false" />
    <div class="flex gap-24">
      <nuxt-link to="/" class="text-xs uppercase cursor-pointer">
        {{ appName }}
      </nuxt-link>
      <nav class="">
        <ul class="flex flex-row">
          <li
            v-for="link in links"
            :key="link.name"
            class="text-xs text-gray-700 "
          >
            <nuxt-link v-if="!searchOverlay" :to="link.url">
              {{ link.name }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="flex flex-row gap-3 self-center">
      <button
        v-if="!searchOverlay"
        class="text-gray-700 text-xs flex flex-row gap-2 items-center p-2"
        @click="searchOverlay = true"
      >
        <searchIcon class="text-gray-700" />
        <p>Search</p>
      </button>
      <template v-else>
        <searchIcon class="text-gray-700 self-center regular-svg" />
        <input
          ref="search"
          v-model="searchQuery"
          type="text"
          :placeholder="`Search ${appName}...`"
          @keyup.enter="search()"
        />
        <closeIcon
          class="bigger-svg self-center cursor-pointer"
          @click="searchOverlay = false"
        />
      </template>
      <button
        class="border border-solid border-gray-700 text-xs flex flex-row gap-2 items-center px-2 py-1 rounded"
      >
        Create
        <pen-icon />
      </button>
      <div class="h-auto border-l border-solid border-gray-300"></div>
      <button class="p-2 text-xs rounded">
        Sign In
      </button>
      <button
        class="bg-gray-700 text-white p-2 text-xs rounded"
        @click="modalCreateShow = true"
      >
        Get Started
      </button>
    </div>
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
import penIcon from "@/assets/icons/utility/pen.svg?inline";
import searchIcon from "@/assets/icons/utility/search.svg?inline";
import closeIcon from "@/assets/icons/utility/close.svg?inline";
import createModal from "@/components/create/CreateModal";

export default {
  components: { searchIcon, closeIcon, penIcon, createModal },
  data() {
    return {
      links: [
        {
          name: "Home",
          url: ""
        },
        {
          name: "Tech",
          url: "tech"
        },
        {
          name: "Science",
          url: "science"
        }
      ],
      scrollPosition: 0,
      lastScrollPosition: 0,
      headerIsHidden: false,
      headerHasShadow: false,
      searchOverlay: false,
      searchQuery: "",
      modalCreateShow: false
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
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0 || this.modalCreateShow) {
        return;
      }

      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }

      this.headerIsHidden = currentScrollPosition >= this.lastScrollPosition;
      this.headerHasShadow =
        currentScrollPosition >= 60 && !this.headerIsHidden;
      this.searchOverlay =
        this.searchOverlay && currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
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
    },
    login() {
      this.$auth.loginWith("auth0");
    },
    logout() {
      this.$auth.logout();
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

button {
  svg {
    height: auto;
    width: 18px;
    @apply fill-current;
  }
}

.regular-svg {
  height: auto;
  width: 18px;
  @apply fill-current;
}
.bigger-svg {
  width: 24px;
  height: 24px;
}

header {
  transition: transform 0.2s linear, box-shadow 0.2s ease;
  nav {
    a {
      @apply p-4 mx-1;
      user-select: none;
      &:hover {
        @apply cursor-default border-b-2 border-solid border-gray-700 text-black;
      }
      &.nuxt-link-exact-active {
        @apply cursor-default border-b-2 border-solid border-black font-bold text-black;
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
