const RedEnvelope = artifacts.require("RedEnvelope");
const truffleAssert = require("truffle-assertions");
const { expectEvent, time } = require("@openzeppelin/test-helpers");

contract("Collection Pizzerias", (accounts) => {
  let redEnvelope, creator, receipt, envelopeId, eventtest;
  before(async () => {
    redEnvelope = await RedEnvelope.new();
    creator = accounts[0];
    claimer = accounts[1];
  });

  /********************************************************
   *                                                       *
   *                     CREATE ENVELOPE FUNCTIONS         *
   *                                                       *
   ********************************************************/

  describe("Create Envelope", () => {
    it("Envelope Created succesfully", async () => {
      receipt = await redEnvelope.createEnvelope(5, "This is a test message", {
        value: 100000000,
      });
      await redEnvelope.getCreatorEnvelopes(creator);
    });
    it("EnvelopeCreated Event emited", async () => {
      envelopeId = await redEnvelope.creatorToEnvelope(creator, 0);
      await expectEvent(receipt, "EnvelopCreated", {
        envelopeId: envelopeId.toString(),
      });
    });
    it("Creator getter works", async () => {
      receipt = await redEnvelope.getEnvelope(envelopeId);
    });

    //**************************Testing Envelope struct*******************************************

    it("Testing creator", async () => {
      assert.equal(receipt.creator, creator, "Address does not match");
    });

    it("Testing totalTokenAmount", async () => {
      assert.equal(
        receipt.totalTokenAmount,
        100000000,
        "Total Token Amount does not match"
      );
    });

    it("Testing TokenAmount", async () => {
      assert.equal(
        receipt.tokenAmount,
        100000000,
        "Token Amount does not match"
      );
    });

    it("Testing participantsLimit", async () => {
      assert.equal(
        receipt.participantsLimit,
        5,
        "Participant's Limit does not match"
      );
    });

    it("Testing participants array", async () => {
      assert.equal(
        receipt.participants.length,
        0,
        "Participant array does not match"
      );
    });

    it("Testing participantsPrize array", async () => {
      assert.equal(
        receipt.participantsPrize.length,
        0,
        "Participant Prize array does not match"
      );
    });

    it("Testing envelope message", async () => {
      assert.equal(
        receipt.message,
        "This is a test message",
        "Envelope message does not match"
      );
    });

    it("Testing CreationTime", async () => {
      assert.equal(
        receipt.CreationTime,
        await time.latestTime,
        "Creation time does not match"
      );
    });
  });

  /********************************************************
   *                                                       *
   *                     CALIM PRICE FUNCTIONS             *
   *                                                       *
   ********************************************************/

  describe("Claim", () => {
    it("Claim works", async () => {
      eventtest = await redEnvelope.claim(envelopeId, { from: claimer });
      truffleAssert.eventEmitted(
        eventtest,
        "Claimed",
        (ev) => {
          return ev.claimed === true;
        },
        "TestEvent should be emitted with correct parameters"
      );
      receipt = await redEnvelope.getEnvelope(envelopeId);
    });

    //**************************Testing updated Envelope struct*************************************

    it("Testing TokenAmount", async () => {
      assert.equal(
        receipt.tokenAmount,
        (receipt.totalTokenAmount - receipt.participantsPrize[0]).toString(),
        "Token Amount does not match"
      );
    });

    it("Testing participants array", async () => {
      assert.equal(
        receipt.participants,
        claimer,
        "Participant array does not match"
      );
    });

    it("Testing participants array", async () => {
      assert.equal(
        receipt.participants.length,
        1,
        "Participant array does not match"
      );
    });

    it("Testing participantsPrize array", async () => {
      assert.equal(
        receipt.participantsPrize[0],
        (receipt.totalTokenAmount - receipt.tokenAmount).toString(),
        "Participant Prize array does not match"
      );
    });
  });

  /*****************************************************************
   *                                                               *
   *                     CREATOR WITHDRAW FUNCTIONS                *
   *                                                               *
   ****************************************************************/

  describe("Creator Withdraw", () => {
    it("Creator withdraw", async () => {
      eventtest = await redEnvelope.creatorWithdraw(envelopeId);
      receipt = await redEnvelope.getEnvelope(envelopeId);
      truffleAssert.eventEmitted(eventtest, "CreatorWithdrawn", (ev) => {
        return ev.withdrawn === true;
      });
    });

    it("Testing TokenAmount post withdraw", async () => {
      assert.equal(receipt.tokenAmount, 0, "Token Amount does not match");
    });
  });
});
