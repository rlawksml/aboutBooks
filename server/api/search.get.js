// server/api/search.get.js
import { OpenAI } from 'openai';
import { defineEventHandler, getQuery } from 'h3';

const config = useRuntimeConfig();

// 환경 변수에서 API 키를 가져옵니다.
const openai = new OpenAI({
    apiKey: config.public.OPENAI_API_KEY,
});

export default defineEventHandler(async (event) => {
    // 쿼리 파라미터(q)를 안전하게 가져옵니다.
    const query = getQuery(event);
    const userQuery = query.q;

    if (!userQuery) {
        return {
            error: '검색어를 입력해주세요.',
        };
    }

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            // response_format을 json_object로 설정하여 JSON 응답을 강제합니다.
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: "You are a helpful assistant that responds in JSON." },
                // JSON 형식에 대한 명확한 지시를 프롬프트에 추가합니다.
                { role: "user", content: `${userQuery}에 대해서 정보를 JSON 형식으로 제공해줘. 응답은 'title', 'summary', 'details', 'recommand', 'otherBooks' 키를 포함해야 해.` }
            ],
        });

        const gptResponse = chatCompletion.choices[0].message.content;

        // 클라이언트에게 결과를 반환합니다.
        return {
            result: gptResponse,
        };

    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        return {
            error: 'API 호출에 실패했습니다.',
        };
    }
});