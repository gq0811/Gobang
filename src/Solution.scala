package  src

import scala.collection.mutable
import scala.util.Random
import scala.collection.mutable.Set

class Solution {

  //数组的轴。下面这种方法只适用于单一情况。如果有多个数，其出现的次数相同，就不对了
  def findShortestSubArray(nums: Array[Int]): Int = {
    var map=nums.map((_,1)).groupBy(_._1).map(t=>(t._1,t._2.size)).toList.sortBy(-_._2)
    println(map)
    var maxVal= map.headOption match{
      case Some(ts)=>ts._1.intValue()
      case None=>None
    }
    var maxCount:Int=map.headOption match {
      case Some(ts)=>ts._2.intValue()
    }
    var p:Int=maxCount
    var count=0
    var start,end=0

    for(i<-0 to nums.length-1){
      if(nums(i).equals(maxVal)){

        if(p.equals(maxCount)){
          start=i;
        }
        if(p==1){
          end=i;
        }
        p=p-1
      }
    }
    end-start+1
  }


  def findShortestSubArray2(nums: Array[Int]): Int = {
    var left,right:Map[Int,Int]=Map()
    var count=nums.map((_,1)).groupBy(_._1).map(t=>(t._1,t._2.size))
    for(i<-0 to nums.length-1)
      right+=(nums(i)->i)
    for(i<-nums.length-1 to (0,-1))
      left+=(nums(i)->i)
    //最大的长度
    var maxLength=count.maxBy(_._2)._2
    var result=nums.length
    count.foreach(x=>
       if(x._2.equals(maxLength)){
         result=Math.min(result,right(x._1)-left(x._1)+1)
       }
    )
    var a=133
    var b=32.543
    println(a.getClass)
    println(b.getClass)
    result
  }
   //求是否有两数，相加得指定的数
  def twoSum(nums: Array[Int], target: Int): Array[Int] = {
     val res=new Array[Int](2)    //想和java一样指定数组的长度。必须要new一个对象。
    if(nums==null||nums.length==0)
      res
    var len=nums.length
    for(i<-0 to len-1 ;j<-i+1 to len-1){
       if(nums(i)+nums(j)==target){
         res(0)=i;
         res(1)=j;
       }
    }
    res
  }

  def twoSum2(nums: Array[Int], target: Int): Array[Int] = {
    val res=new Array[Int](2)    //想和java一样指定数组的长度。必须要new一个对象。
    if(nums==null||nums.length==0)
      res
    var len=nums.length
    var map=Map[Int,Int]()
    for(i<-0 to len-1 ){
      if(map.contains(target-nums(i))){
         res(1)=i;
        res(0)=map.get(target-nums(i)).get
        res
      }
      map+=(nums(i)->i)
    }
     res
  }

  def isValidString(s:String):Boolean ={
      if( s==null|| s.length==0) {
        return true
      }
      else if(s.equals("1")) {
        return false
      }
      else if (s.startsWith("10")||  s.startsWith("11")){
        return isValidString(s.tail.tail)
      }else if (s.startsWith("0")){
       return  isValidString(s.tail)
      }
      return false
  }

  //生成指定长度的随机字符串
  val arr="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray
  val random=new Random
  def dfsRandomString(len:Int,sb:StringBuilder): Unit ={
    if(len<=0)
      return;
    sb.append( arr(random.nextInt(36)))
    dfsRandomString(len-1,sb);
  }
  def getRandomString(len:Int): String ={
    var sb=new StringBuilder
    dfsRandomString(len,sb)
    sb.toString
  }

  //连续数组元素乘积小于k的个数
  def numSubarrayProductLessThanK(nums: Array[Int], k: Int): Int = {
    if(k<=1)
      return 0
    var result=0    //个数
    var product=1   //当前乘积
    var len=nums.length
    var i, j=0
    while(i<len&&j<len){
      product*=nums(j)
      while(i<len&&product>=k){       //如果当前以i为开头的总乘积仍然>k,肯定就不能再以i为开头。
        product/=nums(i)
        i+=1
      }
      result+=j-i+1
      j+=1
    }
    return result
  }


  def findShortestSubArray3(nums: Array[Int]): Int = {
    var map=nums.map((_,1)).groupBy(_._1).map(t=>(t._1,t._2.size)).toList.sortBy(-_._2)
    println(map)
    var maxVal= map.headOption match{
      case Some(ts)=>ts._1.intValue()
      case None=>None
    }
    var maxCount:Int=map.headOption match {
      case Some(ts)=>ts._2.intValue()
    }
    var p:Int=maxCount
    var count=0
    var start,end=0

    for(i<-0 to nums.length-1){
      if(nums(i).equals(maxVal)){

        if(p.equals(maxCount)){
          start=i;
        }
        if(p==1){
          end=i;
        }
        p=p-1
      }
    }
    end-start+1
  }

  def showCapital(x: Option[String]) = x match {
    case Some(s) => s
    case None => "?"
  }

  def isMatch (text:String,pattern:String):Boolean={
    if(pattern==null||text==null)
      return false
    var firstMatch=(pattern.length>0&&text.length>0&&(pattern.charAt(0)==text.charAt(0) || pattern.charAt(0)=='.' ))
    if(pattern.length>1&&pattern.charAt(1)=='*'){
      return isMatch(text,pattern.substring(2))||(firstMatch&&isMatch(text.substring(1),pattern))
    }else{
      return  firstMatch&&isMatch(text.substring(1),pattern.substring(1))
    }
  }

  def lengthOfArr (str:String):Int={
    var arr=str.split(",")
    arr.length;
  }

  def isContain(str1:String,str2:String):Boolean={
    var arr=str1.split(",")
    for(st<-arr){
      if(str2.contains(st))
        return true;
    }
    return false;
  }

  def testSet(str:String)={
      var goodsSet=Set[String]()
    var arr=str.split(",")
    for(x<-arr){
      goodsSet+=x
    }
    println(goodsSet)
  }

  def numOfEach(str:String):Boolean={
    var arr=str.split(",")
    println(arr.length)
    var map=mutable.HashMap[String,Int]()
    arr.map{x=>
      if(!map.contains(x)){
        map.put(x,1);
      }else{
        map.put(x,map.get(x).get+1)
      }
      if(map.get(x).get>1){
        return false;
      }
    }
    return true;
  }
  //找到一个数组的划分点。使得左右各自的和相等。
  def pivotIndex(nums: Array[Int]): Int = {
    if(nums==null||nums.length==0)
      return -1;
    var len=nums.length
    if(len==1){
      return 0;
    }else if(len==2){
      if(nums(0)==0){
        return 0;
      }else if(nums(1)==0){
        return 1;
      }else{
        return -1;
      }
    }
    var sum:Int=0;
     var sumArray=new Array[Int](len);
    for( i<-0 to len-1 ){
      sum=sum+nums(i)
      sumArray(i)=sum
    }
    for(i<-0 to len-1){
      if(i==0){
        if(sum-sumArray(0)==0){
          return 0;
        }
      }else if(i==len-1){
         if(sumArray(i-1)==0){
           return len-1
         }
      }else{
         if(sumArray(i-1)==sum-sumArray(i)){
           return i;
         }
      }
    }

    return -1;
  }

  case class Good(id:String,sn:String,relation:String )
  def testGroupBy(goodArray:Array[Good])={
    var tmpMap=goodArray.groupBy(_.sn)
    println(tmpMap)
  }




}
