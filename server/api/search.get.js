// server/api/search.get.js
import { OpenAI } from 'openai';
import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);

    // 쿼리 파라미터(q)를 안전하게 가져옵니다.
    const query = getQuery(event);
    const userQuery = query.q;

    if (!userQuery) {
        return {
            error: '검색어를 입력해주세요.',
        };
    }

    // 추천 기능의 키가 없어도 지도와 나머지 페이지는 정상적으로 실행합니다.
    if (!config.openaiApiKey) {
        return {
            error: '도서 추천 API 키가 설정되지 않았습니다.',
        };
    }

    try {
        const openai = new OpenAI({
            apiKey: config.openaiApiKey,
        });

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
