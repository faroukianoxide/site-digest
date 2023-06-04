// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { convert } from 'html-to-text';
import axios from 'axios';

type Data = {
  data: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
  const site = req.query.site as string;
  const response = await axios.get(site);
  const conversion = convert(response.data);

  const stringLength = conversion.length;
  console.log(stringLength);
  const wordLength = conversion.split(' ').length;
  console.log(wordLength);


  //console.log(conversion.substring(0, conversion.length/2))

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.OPEN_AI_KEY
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: "user", content: `

              The following is a web page conpressed into a text. As an intelligent agent,
              extract the key contents of this page and return a summary of the page.
             After the generation, you should create another paragraph that contains any relevant link to the summary.
             Your result must be in mark down  and all your links must be underlined for the operation to be successful
              
              Gook luck.

              Here is the compressed content: ${conversion.substring(conversion.length/2)}


              
              `,
            },
          ],
        }),
      }

    )
    let gptResponse = await response.json();
    console.log(gptResponse)
    if (response.status == 401) {
      return res.json({
        error: "Something is wrong with your OpenAI Key."
      })
    } else if (response.status >= 500 ){
      return res.json({
        error: "Something is wrong with the back-end. Try again."
      })
    }
    let gptResult = gptResponse.choices[0].message.content;
    console.log("done!")
    console.log(gptResponse)
    return res.json(gptResult);
   } catch (e) {
    console.log(e)
   
    return res.json({
      error: "Something went wrong. Try again"
    })
   }
  //
  //res.status(200).json({ data: conversion })
  
}
