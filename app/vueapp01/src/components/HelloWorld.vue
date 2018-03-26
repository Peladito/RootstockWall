<template>
  <div class="container">
                    <hr>
                    <h3>Last Message: {{ultimoMensaje}}</h3>
                    <form class="form-inline">
                        <div class="form-group mx-sm-3 mb-2 col-8">
                            <label for="inputText" class="sr-only">Message</label>
                            <input type="text" class="form-control" v-model="inputText" placeholder="Your text..." style="width:100%">
                        </div>
                        <button type="button" class="btn btn-primary mb-2" v-on:click="makeBud">{{buttonLabel}}</button>
                    </form>
                    <h3>Your tx(s)</h3>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col-1">#</th>
                          <th scope="col">Block Hash</th>
                          <th scope="col">Tx Hash</th>
                          <th scope="col">Gas used</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="tx in txs">
                          <td class="col-3">{{ tx.blockNumber }}</td>
                          <td class="col-3">{{ tx.blockHash }}</td>
                          <td class="col-3">{{ tx.transactionHash }}</td>
                          <td class="col-3">{{ tx.cumulativeGasUsed }}</td>
                        </tr>
                      </tbody>
                    </table>
                </div>
                
</template>

<script>
import Web3 from "web3";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      contract: null,
      buttonLabel: "Write in stone",
      inputText: "",
      web3: null,
      web3Provider: null,
      ultimoMensaje: "",
      txs: []
    };
  },
  beforeMount: function() {
    this.connectToContract();
  },
  methods: {
    async connectToContract() {
      var abi = await require("../assets/RootstockWall.json");
      var contractAddress = "0x2a504b5e7ec284aca5b6f49716611237239f0b97";
      //console.log(window.web3);
      this.web3Provider = window.web3.currentProvider;
      this.web3 = new Web3(this.web3Provider);
      this.contract = new this.web3.eth.Contract(abi.abi, contractAddress);
      this.getMessage();
    },
    makeBud: function() {
      if (this.inputText.length == 0) {
        alert("Please write some message");
        return;
      }
      this.contract.methods
        .setMessage(this.inputText)
        .send({ from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57" })
        .then(result => {
          this.buttonLabel = "Message sent...";
          setTimeout(() => {
            this.buttonLabel = "Write in stone";
            this.getMessage();
          }, 5000);
          this.txs.push(result);
        });
    },
    getMessage() {
      this.ultimoMensaje = "Buscando mensaje....";
      this.contract.methods
        .message()
        .call({ from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57" })
        .then(result => {
          this.ultimoMensaje = result;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  text-align: center;
}
.container > h3 {
  text-align: left;
}
.table tr:first-child {
  font-size: 14px;
}
.table tr {
  font-size: 11px;
}
</style>
<style href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></style>
<style href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></style>