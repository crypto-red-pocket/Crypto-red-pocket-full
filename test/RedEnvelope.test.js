const RedEnvelope = artifacts.require('RedEnvelope');
const { expectRevert, expectEvent, time } = require('@openzeppelin/test-helpers')

contract('Collection Pizzerias', (accounts) => {
  let redEnvelope, creator, receipt
  before(async() => {
    redEnvelope = await RedEnvelope.new()
    creator = accounts[0]
  })

  describe("Create Envelope", ()=> {
    it("Envelope Created succesfully", async()=> {
      await redEnvelope.createEnvelope(5,"Hello there!", { value: 500})
      receipt = await redEnvelope.getCreatorEnvelopes(creator)
      console.log(receipt.toString())
    })
    it("EnvelopeCreated Event emited", async() => {
      await expectEvent(receipt,'')
    })
  })

})