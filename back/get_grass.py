import requests
from bs4 import BeautifulSoup

def getGrassNum(username:str)->list:
    # ページを取得
    url = "https://github.com/users/" + username + "/contributions"
    response = requests.get(url)
    if response.status_code!=200:
        return [(-1,-1)]
    # BeautifulSoup初期化
    soup = BeautifulSoup(response.text, "html.parser")
    # コントリビューション情報を抽出
    contributions = soup.find_all("rect", class_="ContributionCalendar-day")

    ret_cont=[]

    # 各日付毎にコントリビューション数を表示
    for day in contributions:
        date = day.get("data-date")
        count = day.get("data-count")
        if date!=None:
            ret_cont.append((date,count))
            #date=datetime.strptime(date,"%Y-%m-%d")
    return ret_cont
            
def getGrassColor(num:int)-> str:
    #色分けは適当
    if num==0:
        return "\033[48;2;0;0;0m \033[0m"
    elif num<10:
        return "\033[48;2;0;100;0m \033[0m"
    elif num<20:
        return "\033[48;2;0;150;0m \033[0m"
    elif num<30:
        return "\033[48;2;0;200;0m \033[0m"
    else:
        return "\033[48;2;0;250;0m \033[0m"









