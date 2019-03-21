### BlockChain api server  
  
RedToken 대응 blockChain api 서버  
  
  
> 개발환경  
node, web3js  
node-dependencies:package.json 참고  
  
> 설정  
.env 파일을 .envsample 파일을 참고하여, 각 환경에 맞춰 작성한다.  
infura 가입 후 연계 토큰등을 설정 파일에 저장함.   
  
  



### 주의 사항  
> privateKey 에 대한 유의  
> web3 version bug 에 대해 유의 하여야 한다.  
  └ Error: Couldn't decode uint256 from ABI: 0x => 버전에 따른 에러..  
           상위 버전에서는 해결 되어 있으나, transaction 에 문제 있다.  
           (조회시 데이터가 없을 경우에만 해당됨.::에러발생지점을 확인해 볼 것::node_modules)  
    
> blockChain 내 error message 유형이 명확 하지 않은 경우가 있으므로, 그에 따른 감안을 할 것.  
  ex)  권한 미 부여 에러시 .. 가스 부족 에러로 나타남..  
  
> 함수별 권한 주의 할 것. 처리 불가.  
  
