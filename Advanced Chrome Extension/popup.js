const stringInput = document.getElementById('search1');
const numberInput = document.getElementById('search2');
const button = document.getElementById('button');


button.addEventListener('click',function clickHandler(e) {
  const stringValue = stringInput.value;
  const numberValue = numberInput.value;
  const Array=[];
  
  for(let i=1; i<=numberValue; i++ ){

    Array.push(`https://www.linkedin.com/search/results/people/?keywords=${stringValue}&page=${i}`);
  }
    (async () =>
    {
        
        for(j of Array)
        {
            await new Promise(resolve =>
                {
                    chrome.tabs.update({url: j, active: true}, tab=>
                    {
                        chrome.tabs.onUpdated.addListener(function onUpdated(tabid, loading)
                        {
                            if(tabid === tab.id && loading.status == 'complete')
                            {
                                chrome.tabs.onUpdated.removeListener(onUpdated);
                                chrome.tabs.executeScript(tabid, {file: "contentScript.js"}, ()=>
                                {
                                    chrome.tabs.sendMessage(tab.id, {greeting: "hello"},(response)=>
                                    {
                                        const post = async (data)=>
                                        {
                                            const response = await fetch('https://602e7c2c4410730017c50b9d.mockapi.io/linkedIN_js_ext_task',
                                            {
                                                method: 'POST',
                                                headers: {'Content-type':'application/json'},
                                                body: JSON.stringify(data)
                                            });
                                            const res = await response.json();
                                            return res;
                                        }

                                        const res1 = post(response.data);
                                        const userDetails = (response.data);
                                        console.log(userDetails);
                                        console.log(res1);                                            
                                    });
                                    resolve();
                                })
                            }
                        })
                    })  
                });
        }
    })();

})


      






