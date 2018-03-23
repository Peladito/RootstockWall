<template>
  <div class="container">
                    <h2>Rootstock Wall</h2>
                    <hr>
                    <form class="form-inline">
                        <div class="form-group col-md-8">
                            <label for="inputText" class="sr-only">Message</label>
                            <input type="text" class="form-control" v-model="inputText" placeholder="Your text...">
                        </div>
                        <button type="button" class="btn btn-primary mb-2" v-on:click="makeBud">{{buttonLabel}}</button>
                    {{message}}
                    </form>
                </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      contract : null,
      buttonLabel:"Write on stone",
      inputText:"",
      message:''
    }
  },
   beforeMount: function(){
      
     var abi = [{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialMessage","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newMessage","type":"string"}],"name":"weHaveAMessage","type":"event"},{"constant":false,"inputs":[{"name":"_newMessage","type":"string"}],"name":"setMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
            
            var contractAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10'
            this.contract = web3.eth.contract(abi).at(contractAddress);

  },
  ready: function (){
     setInterval(function () {
      this.loadData();
    }.bind(this), 5000); 
  },
 methods:{
       makeBud: function(){
           this.buttonLabel= 'Writting ...';

           this.contract.setMessage(this.inputText,() => {
             
             this.buttonLabel= 'Write on stone';
             this.loadData()
          });
                
       },
       loadData: function(){
         this.contract.message.call((message)=>{
           this.message=message
            console.log(this.contract)
         })
        
       }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
            text-align: center;
        }
</style>
<style href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></style>
<style href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></style>