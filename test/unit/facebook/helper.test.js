import FacebookHelper from '../../../src/facebook/helper.js'

describe('facebook-helper', () => {
  let facebookHelper = null;

  before((done) => {
    let userId = "790001111011196";
    let token = "EAACEdEose0cBALTW5M8EvBNi0MvfRQd6fYzZCrOx0gQxhjxrVKG6hZBkjCqm6EZCPoV2uMVz60MYzJQ5a7vQEQUf5Hr3mAiImNlPGCycAFafhFUe6ubBVAtrWrAWD8CDR9CZBcMSLIQ2NicdHKpjOs3PqqNR1JX3Rds3NZAy5KgZDZD";
    facebookHelper = new FacebookHelper({userId, token});
    console.log(facebookHelper);
    done();
  });

  it("get friends list", async (done) => {
    try {
      let friends = await facebookHelper.getFriends();
      console.log("friends", friends);
      (friends != null).should.be.true;
      friends.should.be.Array;
      friends[0].should.have.keys("name", "id");
      done();
    } catch (e) {
      done(e);
    }
  });

  it.skip("publish post", async (done) => {
    try {
      let post = {
        message: 'test facebook post api'
      }
      let result = await facebookHelper.publishPost(post);
      console.log("result", result);
      done();
    } catch (e) {
      done(e);
    }
  });
});
