<template>
  <div class="">
    <div class="header p-5 d-flex flex-row justify-content-between">
      <h1 style="color: #8d191c">Histori Test</h1>
      <div class="d-flex flex-row align-middle">
        <div class="p-2 border mr-3 rounded align-self-center">
          <i class="fas fa-filter" style="color: grey" />
        </div>
        <form class="form-inline">
          <input
            v-model="searchController"
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
    </div>
    <div class="rounded">
      <table
        class="table position-relative"
        style="
           {
            border-top: none !important;
          }
        "
      >
        <thead class="sticky-top bg-white shadow-sm">
          <tr>
            <th class="py-3 pl-4" scope="col">No</th>
            <th class="py-3" scope="col">Nama Test</th>
            <th class="py-3" scope="col">Kode Test</th>
            <th class="py-3" scope="col">Kategori Test</th>
            <th class="py-3" scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody class="align-middle">
          <tr v-for="(data, index) in filterData" :key="index">
            <th class="py-3 pl-4 align-middle" scope="row">{{ index + 1 }}</th>
            <td class="py-3 align-middle">{{ data.title }}</td>
            <td class="py-3 align-middle">
              <b>{{ data.code }}</b>
            </td>
            <td class="py-3 align-middle">Kecermatan</td>
            <td class="py-3">
              <div>
                <button
                  class="btn mpa-btn-primary text-white"
                  v-on:click="lihatTest"
                >
                  Lihat Test
                </button>
              </div>
            </td>
          </tr>
          <!-- <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
  methods: {
    lihatTest() {
      this.$router.push("/history-detail");
    },
  },
  computed: {
    filterData() {
      if (this.searchController == "" || this.searchController == null) {
        return this.historyData;
      } else if (this.searchController) {
        return this.historyData.filter((item) => {
          if (item.code.includes(this.searchController.toUpperCase()) != 0) {
            return item;
          }
        });
      }
    },
  },
  data() {
    return {
      searchController: "",
      filteredData: [],
      historyData: [
        {
          id: 1,
          code: "GANPSI29032022",
          title:
            "Latihan 1 Psikologi Kecermatan 10 Mei 2022 (Huruf-Angka hilang)",
        },
        {
          id: 2,
          code: "PSI921(GAN8AVS2",
          title:
            "Latihan 2 Psikologi Kecermatan 11 Mei 2022 (Huruf-Angka hilang)",
        },
        {
          id: 3,
          code: "PSIK231S(GAN8AVS2",
          title:
            "Latihan 3 Psikologi Kecermatan 12 Mei 2022 (Huruf-Angka hilang)",
        },
        {
          id: 1,
          code: "GANPSI29032022",
          title:
            "Latihan 1 Psikologi Kecermatan 10 Mei 2022 (Huruf-Angka hilang)",
        },
        {
          id: 2,
          code: "PSI921(GAN8AVS2",
          title:
            "Latihan 2 Psikologi Kecermatan 11 Mei 2022 (Huruf-Angka hilang)",
        },
        {
          id: 3,
          code: "PSIK231S(GAN8AVS2",
          title:
            "Latihan 3 Psikologi Kecermatan 12 Mei 2022 (Huruf-Angka hilang)",
        },
        {
          id: 1,
          code: "GANPSI29032022",
          title:
            "Latihan 1 Psikologi Kecermatan 10 Mei 2022 (Huruf-Angka hilang)",
        },
        {
          id: 2,
          code: "PSI921(GAN8AVS2",
          title:
            "Latihan 2 Psikologi Kecermatan 11 Mei 2022 (Huruf-Angka hilang)",
        },
        {
          id: 3,
          code: "PSIK231S(GAN8AVS2",
          title:
            "Latihan 3 Psikologi Kecermatan 12 Mei 2022 (Huruf-Angka hilang)",
        },
        {
          id: 1,
          code: "GANPSI29032022",
          title:
            "Latihan 1 Psikologi Kecermatan 10 Mei 2022 (Huruf-Angka hilang)",
        },
      ],
    };
  },
};
</script>

<style>
.table tbody tr:hover td,
.table tbody tr:hover th {
  cursor: auto;
  background-color: #f4e8e8;
}
</style>
