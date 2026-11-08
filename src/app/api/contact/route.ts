import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, phone, email, address, scope, area, budget, overview, schedule } = await req.json();

    // 접수 시각 (한국 표준시 KST)
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Seoul',
    }).format(now);

    // Daum 스마트워크 / Daum 메일 SMTP 설정
    const transporter = nodemailer.createTransport({
      host: 'smtp.daum.net',
      port: 465,
      secure: true, // SSL 보안 연결
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 지도 검색 링크 생성 (대지 주소가 있는 경우)
    const mapSearchUrl = address && address !== '미선택' && address !== '미입력'
      ? `https://map.naver.com/p/search/${encodeURIComponent(address)}`
      : '';

    // HTML 이메일 템플릿 (웹사이트 양식과 100% 동기화된 건축 양식 문서)
    const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>LIKE ARCHITECTS 설계 의뢰서</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', 'Malgun Gothic', sans-serif; color: #222222; line-height: 1.6;">
  <div style="max-width: 680px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
    
    <!-- 헤더 -->
    <div style="background-color: #000000; padding: 28px 32px; color: #ffffff;">
      <p style="margin: 0 0 6px 0; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #888888;">Project Inquiry Document</p>
      <h1 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.05em;">LIKE ARCHITECTS 온라인 설계 의뢰서</h1>
      <p style="margin: 8px 0 0 0; font-size: 12px; color: #aaaaaa;">접수 일시 : ${formattedDate} (KST)</p>
    </div>

    <div style="padding: 32px;">
      
      <!-- 1. 의뢰인 기본 정보 -->
      <div style="margin-bottom: 28px;">
        <h2 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 6px;">
          01. 의뢰인 정보 (Client Info)
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="width: 140px; padding: 10px 12px; background-color: #fafafa; border-bottom: 1px solid #eeeeee; font-weight: 500; color: #666666;">성함 / 법인명</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #eeeeee; font-weight: 600; color: #000000;">${name || '미입력'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; background-color: #fafafa; border-bottom: 1px solid #eeeeee; font-weight: 500; color: #666666;">연락처</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #eeeeee; font-weight: 600; color: #000000;">
              <a href="tel:${phone}" style="color: #000000; text-decoration: none;">${phone || '미입력'}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; background-color: #fafafa; border-bottom: 1px solid #eeeeee; font-weight: 500; color: #666666;">이메일 주소</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #eeeeee; font-weight: 500; color: #000000;">
              <a href="mailto:${email}" style="color: #000000; text-decoration: underline;">${email || '미입력'}</a>
            </td>
          </tr>
        </table>
      </div>

      <!-- 2. 대지 위치 -->
      <div style="margin-bottom: 28px;">
        <h2 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 6px;">
          02. 대지 위치 (Site Location)
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="width: 140px; padding: 10px 12px; background-color: #fafafa; border-bottom: 1px solid #eeeeee; font-weight: 500; color: #666666;">대지 지번 주소</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #eeeeee; font-weight: 600; color: #000000; line-height: 1.5;">
              ${address || '미입력'}
              ${mapSearchUrl ? `<div style="margin-top: 6px;"><a href="${mapSearchUrl}" target="_blank" style="display: inline-block; font-size: 11px; padding: 3px 8px; background-color: #f0f0f0; border: 1px solid #d0d0d0; color: #333333; text-decoration: none; border-radius: 2px;">↗ 네이버 지도에서 위치 확인</a></div>` : ''}
            </td>
          </tr>
        </table>
      </div>

      <!-- 3. 프로젝트 조건 -->
      <div style="margin-bottom: 28px;">
        <h2 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 6px;">
          03. 프로젝트 조건 (Scope & Scale)
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="width: 140px; padding: 10px 12px; background-color: #fafafa; border-bottom: 1px solid #eeeeee; font-weight: 500; color: #666666;">의뢰 분야</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #eeeeee; font-weight: 600; color: #000000;">${scope || '미선택'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; background-color: #fafafa; border-bottom: 1px solid #eeeeee; font-weight: 500; color: #666666;">의뢰 규모 / 면적</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #eeeeee; color: #222222;">${area || '미선택'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; background-color: #fafafa; border-bottom: 1px solid #eeeeee; font-weight: 500; color: #666666;">예상 예산 범위</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #eeeeee; color: #222222;">${budget || '미선택'}</td>
          </tr>
        </table>
      </div>

      <!-- 4. 프로젝트 개요 및 문의 내용 -->
      <div style="margin-bottom: 28px;">
        <h2 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 6px;">
          04. 프로젝트 개요 및 문의 내용 (Overview)
        </h2>
        <div style="background-color: #fafafa; border: 1px solid #eeeeee; padding: 16px; font-size: 13px; line-height: 1.8; color: #111111; white-space: pre-wrap; word-break: break-all;">
${overview || '내용 없음'}
        </div>
      </div>

      <!-- 5. 희망 일정 및 상담 요청 -->
      <div style="margin-bottom: 28px;">
        <h2 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 6px;">
          05. 희망 일정 및 상담 안내 (Schedule)
        </h2>
        <div style="background-color: #fafafa; border: 1px solid #eeeeee; padding: 14px 16px; font-size: 13px; color: #333333;">
          ${schedule ? schedule.replace(/\n/g, '<br/>') : '별도 기재 사항 없음'}
        </div>
      </div>

      <!-- 푸터 -->
      <div style="border-top: 1px solid #dddddd; padding-top: 20px; font-size: 11px; color: #888888; line-height: 1.6;">
        <p style="margin: 0 0 4px 0; font-weight: 600; color: #333333;">LIKE ARCHITECTS (라이크 건축사사무소)</p>
        <p style="margin: 0;">서울특별시 송파구 풍성로30, 101 | Tel. 02-477-4407 | Email. like@likearchitects.kr</p>
        <p style="margin: 6px 0 0 0; color: #aaaaaa;">본 메일은 웹사이트 온라인 의뢰 신청 시스템을 통해 자동으로 발송된 업무 문서입니다.</p>
      </div>

    </div>
  </div>
</body>
</html>
    `;

    // 텍스트 폴백 (HTML을 지원하지 않는 환경용 포맷)
    const textContent = `
[LIKE ARCHITECTS 온라인 설계 의뢰서]
접수 일시 : ${formattedDate} (KST)

==================================================
01. 의뢰인 정보 (Client Info)
==================================================
• 성함 / 법인명 : ${name || '미입력'}
• 연락처        : ${phone || '미입력'}
• 이메일        : ${email || '미입력'}

==================================================
02. 대지 위치 (Site Location)
==================================================
• 대지 지번 주소 : ${address || '미입력'}
${mapSearchUrl ? `• 지도 확인 : ${mapSearchUrl}\n` : ''}
==================================================
03. 프로젝트 조건 (Scope & Scale)
==================================================
• 의뢰 분야      : ${scope || '미선택'}
• 의뢰 규모/면적 : ${area || '미선택'}
• 예상 예산 범위 : ${budget || '미선택'}

==================================================
04. 프로젝트 개요 및 문의 내용 (Overview)
==================================================
${overview || '내용 없음'}

==================================================
05. 희망 일정 및 상담 안내 (Schedule)
==================================================
${schedule || '별도 기재 사항 없음'}

--------------------------------------------------
LIKE ARCHITECTS (라이크 건축사사무소)
서울특별시 송파구 풍성로30, 101 | 02-477-4407 | like@likearchitects.kr
    `.trim();

    const mailOptions = {
      from: `"LIKE ARCHITECTS 웹문의" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'like@likearchitects.kr',
      replyTo: email, // 소장님이 메일에서 '답장'을 누르면 의뢰인 이메일로 바로 회신 가능
      subject: `[설계의뢰] ${name}님의 프로젝트 문의 (${scope ? scope.split(',')[0] : '신규 의뢰'})`,
      text: textContent,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
