<template>
  <div class="container">
     <b-container >
    <b-row>
      
        <b-col > <img src="../assets/kbx.jpg"></b-col>
 </b-row>
   <b-row>
       <b-btn v-b-modal.modalPopover>Leave my message</b-btn>
    <b-table striped hover :items="orderedBuds">
      <template slot="image" slot-scope="row"><b-img rounded  width="70"  height="70" thumbnail fluid  :src="row.item.image" alt="Responsive image" /></template>
    </b-table>
        
    </b-row>

     
  <b-modal id="modalPopover" title="Preparing my message" hide-footer ref="myModalRef">
   <b-container fluid>
    <b-row >
      <b-col sm="3"><label for="message">Message: </label></b-col>
      <b-col sm="9"><b-form-input  v-model="inputText" id="message" type="text" placeholder='Enter your message here'></b-form-input></b-col>
    </b-row>
    <b-row >
      <b-col sm="3"><label for="fee">Fee: </label></b-col>
      <b-col sm="9"><b-form-input v-model="fee" id="fee" type="text"></b-form-input></b-col>
    </b-row>
    <b-row >
      <b-col sm="3"><label for="image">Image: </label></b-col>
      <b-col sm="9"><b-form-input v-model="image" id="image" type="url"></b-form-input></b-col>
      <b-col> <b-img rounded  width="200" thumbnail fluid  :src="image" alt="Responsive image" /></b-col>
    </b-row>
  </b-container>
  <b-btn class="mt-3" variant="outline-danger" block @click="makeBud">{{buttonLabel}} <i class="fa fa-cog fa-spin" v-if="spining" style="font-size:24px"></i></b-btn>
  </b-modal>
</b-container>
       
            
                </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      contract : null,
      eventContract: null,
      buttonLabel:"Post message",
      inputText:"",
      buds:[],
      fee:0,
      image:null
    }
  },
   beforeMount: async function(){
      
            var abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "message",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "initialMessage",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "newMessage",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "payed",
          "type": "uint256"
        }
      ],
      "name": "NewBud",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newMessage",
          "type": "string"
        }
      ],
      "name": "setMessage",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    }
  ]
            var contractAddress = '0x11090607f1c987ea2ce4e25646c2239f058a802c'
   
            this.contract = new this.web3.eth.Contract(abi, contractAddress);
            this.eventContract = new this.event3.eth.Contract(abi, contractAddress);
            this.eventContract.inputs =  [
        {
          "indexed": false,
          "name": "newMessage",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "payed",
          "type": "uint256"
        }
      ]
            console.log(this.eventContract)
           
            this.eventContract.events.allEvents({fromBlock:0 , toBlock: 'latest'},this.logEvent)
         
            
           //this.contract.events.allEvents({},this.addLog)

  },
 computed:{
   spining: function(){
     return this.buttonLabel==='Writting the contract...please wait'
   },
   orderedBuds: function(){
     return this.buds.sort((a,b)=>b.payed - a.payed)
   },
   message: function(){
     return this.inputText + "[%]"+this.image
   }
 },
 methods:{
       makeBud: async function(){
           this.buttonLabel= 'Writting the contract...please wait';
          let address = (await  this.web3.eth.getAccounts())[0]
          await this.contract.methods.setMessage(this.message).send({from: address, value:this.fee})
          this.$refs.myModalRef.hide()
          this.buttonLabel= 'Post message';
       },
      
    
       logEvent: function(err, log){
         let decodedEvent = this.eventContract._decodeEventABI(log.raw) 
         let messageParts = decodedEvent.returnValues.newMessage.split("[%]")
         let imagen =  messageParts.length==1?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUmmqBG6EkO23YiRXQNzd9MxNqvexbMUDlRhC9D7GzRgwMfdFD":messageParts[1]
         let row = {
                    number : log.blockNumber,
                    message : messageParts[0],
                    image : imagen,
                    payed : decodedEvent.returnValues.payed
         }
         console.log(row)
         this.buds.push(row)
        
       },
      
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
            text-align: center;
           
        }



</style>
<style href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">