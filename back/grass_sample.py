from get_grass import getGrassColor,getGrassNum

username="Chroma7p"
print(username)
#草の情報を取得
contribute=getGrassNum(username)
if contribute==[(-1,-1)]:
    print("取得に失敗しました")
    
#週ごとに分解した上で表示
l=[""]*7
for i,(date,count) in enumerate(contribute):
    l[i%7]+=getGrassColor(int(count))
for i in l:
    print(i)

