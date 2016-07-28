import FacebookHelper from '../../../src/facebook/helper.js';
import task1_initModel from '../../../src/database/task1';


describe('fb friends store in databases', function(){
  let facebookHelper = null;
  let f_list = null;
  let friends = null;
  let models = null;

  before( async function(done){
    let userId = '790001111011196';
    let token  = 'EAACEdEose0cBAAJxqE1YFlC2t47PSHAKnAT2kr9J90j0fFYnjGTwn9u9dk9ZB7UyOpSjrZB6LE1Gj3XgeruLyNYADZCiBAlX2muZAQyZCUHMZASv28FPRyxYuxZBq01eGLJnFYgsL2ImmeNgB3HrGFMb12ZC60EbdILHjL9ZCCy1MvgZDZD';
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
        for(let i = 0, len = f_list.length; i < len; i++){
          await models.Friend.create({
            name: f_list[i].name,
            facebookId: f_list[i].id,
            email: 'nuknow@email.com'
          });
        }

        friends = await models.Friend.findAll();

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
    it('從資料庫中取得所有「朋友」', async (done) => {
      try{
        let result = true;
        friends = await models.Friend.findAll();
        //從 資料庫取得朋友清單 ,應該要與FB API 取得的朋友清單一致

        friends.length.should.be.equal(f_list.length);
        done();
      }
      catch(e){
        done(e);
      }
    });

    it('將朋友的email更新成 hellojs@trunk.studio', async (done) => {
      try{
        let friend_2 = f_list[1].id;
        let f2_data = await models.Friend.findOne( {where: { facebookId: friend_2 } } );
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
