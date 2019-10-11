<template>
  <div>
    <br>
    <br>
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card card-info">
          <div class="card-header">
            <h4 class="text-center">{{ fecha }}</h4>
          </div>
        </div>

        <div class="col-md-12" v-if="!picture">
          <h3 class="text-center">
            <img src="/img/gifloading.gif" width="auto" height="auto">
          </h3>
        </div>

        <div class="col-md-12 text-center">
          <br>
            <div class="row">
              <div class="col-sm-4"></div>
              <div class="col-sm-4">
                <input type="text" class="form-control" placeholder="Date" id="datepicker">
              </div>
              <div class="col-sm-4"></div>
            </div>
        </div>

        <div class="card-body" v-if="picture">
          <div class="row">
            <div class="col-sm-6 col-xs-12">
              <a target="_blank" :href="picture.url">
                <img
                  style="max-height: 350px"
                  width="100%"
                  heigth="100%"
                  class="img-responsive"
                  :src="picture.url"
                  alt
                >
              </a>
            </div>

            <div class="col-sm-6 col-xs-12">
              <div class="row">
                <div class="col-sm-12">
                  <h4 class="text-center">
                    <b>{{ picture.title }}</b>
                  </h4>
                </div>
                <div class="col-sm-12">
                  <p>{{ picture.explanation }}</p>
                </div>

                <div class="col-sm-12" v-if="picture.media_type == 'image'">
                  <div class="form-group">
                    <a
                      target="_blank"
                      :href="picture.hdurl"
                      class="btn btn-info form-control"
                    >View in HD</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="clearfix" style="margin: 10px"></div>

          <div class="row" v-if="fechaAnterior && fechaSiguiente">
            <div class="col-sm-12">
              <center>
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <li class="page-item">
                      <a
                        :disabled="loading"
                        class="page-link"
                        @click.prevent="get(fechaAnterior)"
                      >Previous</a>
                    </li>
                    <li class="page-item" v-if="validDate()">
                      <a
                        :disabled="loading"
                        class="page-link"
                        @click.prevent="get(fechaSiguiente)"
                      >Next</a>
                    </li>
                  </ul>
                </nav>
              </center>
            </div>
          </div>
        </div>

        <div class="card-body" v-if="load">
          <div style>
            <center>
              <img
                width="50%"
                heigth="50%"
                class="img-responsive"
                src="/img/ajax-loading-gif.gif"
                alt
              >
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  mounted() {
    this.get(this.fecha);
    var me = this;
    var picker = new Pikaday({ 
        field: document.getElementById('datepicker'),
        format: 'YYYY/MM/DD',
        onSelect: function(date) {
          var d = date.getDate();
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();

          var t = `${year}-${month}-${day}`;


          me.get(t)
        },
        maxDate: new Date(),
    });
    this.$picker = picker;
  },

  data() {
    return {
      picture: null,
      apiUrl: "/api/nasa",
      CurrentFecha: "2019-02-02",
      fechaSiguiente: "",
      fechaAnterior: "",
      loading: true,
      load: false
    };
  },

  methods: {
    get(fecha) {
      this.loading = true;
      if (fecha == "") {
        fecha = moment().format("YYYY-MM-DD");
      }

      this.picture = null;

      let me = this;
      me.CurrentFecha = fecha;
      axios
        .get(`${this.apiUrl}?date=${fecha}`)
        .then(response => {
          if (Array.isArray(response.data.pic)) {
            me.picture = response.data.pic[0];
          } else {
            me.picture = response.data.pic;
          }

          me.CurrentFecha = me.picture.date;
          me.fechaSiguiente = response.data.fechaSiguiente;
          me.fechaAnterior = response.data.fechaAnterior;
          me.loading = false;
        })
        .catch(err => console.log(err));
    },

    validDate(){
      return this.CurrentFecha < moment().format('YYYY-MM-DD');
    },
  },

  computed: {
    fecha: function(){
      if (this.fechaAnterior == '') {
        return moment().format('YYYY-MM-DD');
      }

      return this.CurrentFecha;
    }
  },

}
</script>

<style>
</style>