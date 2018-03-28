<template>
  <div class="container">
     <b-container >
    <b-row>
      
        <b-col > <img src="../assets/logo.png"></b-col>
 
        <b-col class="bv-col">

                 
                    <b-input-group prepend="Your inmortall words">
    <b-form-input v-model="inputText"></b-form-input>
    <b-input-group-append>
      <b-btn variant="info"  v-on:click="makeBud">{{buttonLabel}} <i class="fa fa-cog fa-spin" v-if="spining" style="font-size:24px"></i></b-btn>
    </b-input-group-append>
  </b-input-group>
  <div id='stiches'> 
    <h3>{{message}}</h3>
    </div>
   
        </b-col>
    </b-row>
</b-container>
       
            
                </div>
                
</template>

<script>
import Web3 from "web3";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      contract : null,
      eventContract: null,
      buttonLabel:"Stich them forever",
      inputText:"",
      message:''
    }
  },
   beforeMount: async function(){
      
            var abi = [{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialMessage","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newMessage","type":"string"}],"name":"weHaveAMessage","type":"event"},{"constant":false,"inputs":[{"name":"_newMessage","type":"string"}],"name":"setMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
            
            var contractAddress = '0xdf6b3fcdd882fb8a2034916c6124c30dd5f8dd50'
   
            this.contract = new this.web3.eth.Contract(abi, contractAddress);
            this.eventContract = new this.event3.eth.Contract(abi, contractAddress);
            console.log(this.eventContract)
            this.eventContract.events.allEvents({},this.logEvent)
            this.addLog()
            
           //this.contract.events.allEvents({},this.addLog)

  },
 computed:{
   spining: function(){
     return this.buttonLabel==='Writting'
   }
 },
 methods:{
       makeBud: async function(){
           this.buttonLabel= 'Writting';
          let address = (await  this.web3.eth.getAccounts())[0]
          await this.contract.methods.setMessage(this.inputText).send({from: address})
           this.addLog()
                
       },
      
       addLog: async function(){
        this.message = await this.contract.methods.message().call() 
        this.buttonLabel= 'Stich them forever';
         
       },
       logEvent: function(err, log){
         console.log('event logging')
         console.log(err)
         console.log(log)
       }
    }
  
};
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
.bv-col{
   padding-top: 150px;
   padding-left: 30px;
   
}

#stiches {
 background-color: white;


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
<style href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">