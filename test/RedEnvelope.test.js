const RedEnvelope = artifacts.require('RedEnvelope');
const { expectRevert, expectEvent, time } = require('@openzeppelin/test-helpers')

contract('Collection Pizzerias', (accounts) => {
  let redEnvelope, creator, receipt, envelopeId
  before(async() => {
    redEnvelope = await RedEnvelope.new()
    creator = accounts[0]
  })

  describe("Create Envelope", ()=> {
    it("Envelope Created succesfully", async()=> {
      receipt = await redEnvelope.createEnvelope(5,"Hello there!", { value: 100000000})
      await redEnvelope.getCreatorEnvelopes(creator)
      console.log(receipt.toString())
    })
    it("EnvelopeCreated Event emited", async() => {
      envelopeId = await redEnvelope.creatorToEnvelope(creator,0)
      await expectEvent(receipt,'EnvelopCreated', {
        envelopeId: envelopeId.toString()
      }
      )
    })
    it("Creator getter works", async()=> {
      receipt = await redEnvelope.getEnvelope(envelopeId)
      console.log(receipt)
    })
  })

  describe("Claim", ()=> {
    it("Claim works", async()=> {
      await redEnvelope.claim(envelopeId)
      await redEnvelope.creatorWithdraw(envelopeId)
    })
  })

})