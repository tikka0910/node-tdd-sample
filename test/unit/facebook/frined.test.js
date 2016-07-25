import FacebookHelper from '../../../src/facebook/helper.js';
import task1_initModel from '../../../src/database/task1';


describe('fb friends store in databases', function(){
  let facebookHelper = null;
  let f_list = null;
  let friends = null;
  let models = null;

  before( async function(done){
    let userId = '790001111011196';
    let token  = 'EAACEdEose0cBAFCUybcwMS5NJsxt26wXcUtzZBHvEsqnvu37TxXZCLvrJHFMD0mCZA6FeTDj0rV8EMw6ncOg75BGYf5RG7DyjLtBhpNwbYXLNP3KjgwP6i9KMmKJawxayri28Cq8iNOBpYWrkU7Sa31ZCGMKrIiM9ZCFsY2bi3yvF6tP053eZB7pGjHSvj8F8ZD';
    models = await task1_initModel();
    facebookHelper = await new FacebookHelper({userId, token});

    //console.log(facebookHelper);
    done();
  });

  describe('使用FB API取得朋友清單' ,() => {
    it('將「朋友」清單存入資料庫', async (done) =>{
      try{
        //f_list => my friends List
        f_list = await facebookHelper.getFriends();
        //write friends in to database.
        friends = await models.Friend.bulkCreate(f_list);
        //friend numbers should equal database record numbers
        friends.length.should.equal(f_list.length);
        done();
      }
      catch(e){
        done(e);
      }
    });
  });

  describe('資料庫操作', () => {
    it('從資料庫中查詢「朋友」', async (done) => {
      try{

        let friend_1 = f_list[0].id;
        let friend_name = f_list[0].name;
        let result = await models.Friend.findById( friend_1 );
        //從 FB API取得的朋友id ,利用id查詢DB, API 與 DB 名字應該要相同
        result.name.should.equal(friend_name);
        done();
      }
      catch(e){
        done(e);
      }
    });

    it('將朋友的email更新成 hellojs@trunk.studio', async (done) => {
      try{
        let friend_2 = f_list[1].id;
        let f2_data = await models.Friend.findById( friend_2 );
        f2_data.email = 'hellojs@trunk.studio';
        let result = await f2_data.save();

        //console.log顯示被更新的 朋友
        console.log("_(°ω°｣ ∠) _(°ω°｣ ∠) _(°ω°｣ ∠)");
        console.log(result.name , result.id , result.email);

        result.email.should.equal('hellojs@trunk.studio');

        done();
      }
      catch(e){
        done(e);
      }
    });

    it('將 已更新email的朋友 「刪除」', async (done) => {
      try{
        //利用email去查詢DB，並刪除紀錄
        let del_friend = await models.Friend.findOne({
          where:{email:'hellojs@trunk.studio'}
        });
        await del_friend.destroy();

        let result = await models.Friend.findOne({
          where:{email:'hellojs@turnk.studio'}
        });

        (result === null ).should.be.true;

        done();
      }
      catch(e){
        done(e);
      }
    });
  });

});
