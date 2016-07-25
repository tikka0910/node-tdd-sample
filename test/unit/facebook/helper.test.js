import FacebookHelper from '../../../src/facebook/helper.js'

describe('facebook-helper', () => {
  let facebookHelper = null;

  before((done) => {
    let userId = "790001111011196";
    let token = "EAACEdEose0cBAFCUybcwMS5NJsxt26wXcUtzZBHvEsqnvu37TxXZCLvrJHFMD0mCZA6FeTDj0rV8EMw6ncOg75BGYf5RG7DyjLtBhpNwbYXLNP3KjgwP6i9KMmKJawxayri28Cq8iNOBpYWrkU7Sa31ZCGMKrIiM9ZCFsY2bi3yvF6tP053eZB7pGjHSvj8F8ZD";
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
