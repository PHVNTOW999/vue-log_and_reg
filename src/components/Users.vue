<template>
  <div class="users">
    <div class="users__search">
      <input
        type="text"
        v-model="input"
        @keyup="findUser"
        class="users__search__input"
        placeholder="find username"
      />
    </div>
    <table class="users__dataBase">
      <hr>
      <tr class="users__dataBase__user">
        <td class="users__dataBase__user-id">ID</td>
        <td class="users__dataBase__user-name">Username</td>
        <td class="users__dataBase__user-email">Email</td>
        <td class="users__dataBase__user-pass">Password</td>
      </tr>
      <hr>
      <tr
        class="users__dataBase__user"
        v-for="(user, i) in filterUsers"
        :key="i"
      >
        <td class="users__dataBase__user-id">{{ user.id }}</td>
        <td class="users__dataBase__user-name">{{ user.username }}</td>
        <td class="users__dataBase__user-email">{{ user.email }}</td>
        <td class="users__dataBase__user-pass">{{ user.password }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "Users",
  data() {
    return {
      filterUsers: [],
      input: "",
    };
  },
  computed: {
    ...mapGetters({ USERS: "USERS" }),
  },
  methods: {
    findUser() {
      if (this.input == "") {
        this.isClear();
      } else {
        this.filterUsers = this.USERS.filter((user) => {
          return user.username.toLowerCase().includes(this.input);
        });
      }
    },
    isClear() {
      this.filterUsers = this.USERS;
    },
  },
  mounted() {
    setTimeout(() => {
      this.filterUsers = this.USERS;
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.users {
  margin: 0 auto;
  margin-top: 20px;
  padding-top: 20px;
  background-color: #000;
  &__search {
    &__input {
      margin: 0 auto;
      margin-bottom: 20px;
      border: 2px solid #fff;
      border-radius: 10px;
    }
    input[type=text] {
      text-align: center;
    }
  }
  &__dataBase {
    display: flex;
    flex-direction: column;
    &__user {
      padding: 10px 0 10px 0;
      display: flex;
      justify-content: space-between;
      &-id {
        width: 250px;
        max-width: 100px;
      }
      &-name {
        width: 250px;
        max-width: 450px;
      }
      &-email {
        width: 250px;
        max-width: 450px;
      }
      &-pass {
        width: 250px;
        max-width: 450px;
      }
    }
  }
  hr {
    margin: 0 auto;
    width: 99%;
  }
}
</style>
