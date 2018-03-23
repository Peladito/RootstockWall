<template>
  <div class="container">
     
                    <h2>Rootstock Wall</h2>
                    <hr>
                   
                    <b-input-group prepend="Your inmortall words">
    <b-form-input v-model="inputText"></b-form-input>
    <b-input-group-append>
      <b-btn variant="info"  v-on:click="makeBud">{{buttonLabel}}</b-btn>
    </b-input-group-append>
  </b-input-group>
  <div id='stiches'> 
    <h3>{{message}}</h3>
    </div>
   
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
           this.contract.allEvents({},this.addLog)
           

  },
 
 methods:{
       makeBud: function(){
           this.buttonLabel= 'Writting ...';

           this.contract.setMessage(this.inputText,() => {
             
             this.buttonLabel= 'Write on stone';
             this.loadData()
          });
                
       },
      
       addLog: function(err, logg){
         this.contract.message((error, message)=>{
           this.message=message
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
       #stiches h3 {
 font-size: 80px;
 line-height: 70px;
 font-family: 'Times New Roman', Times, serif, sans-serif;
 font-weight: bold;
 text-align: center;

}
 
#stiches {
 background-color: white;
 height: 200px;

 margin: 100px auto;
 border: 3px dashed #21303b;
 padding: 50px;
 overflow: auto;
 
 /*shadow*/
 -webkit-box-shadow: 10px 10px 10px rgb(129, 117, 117);
 -moz-box-shadow: 10px 10px 10px  rgb(129, 117, 117);
 box-shadow: 10px 10px 10px  rgb(129, 117, 117);
 
 /*rounded corners*/
 -webkit-border-radius: 20px;
 -moz-border-radius: 20px;
 border-radius: 20px;
}
</style>
