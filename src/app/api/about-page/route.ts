// For creating or fetching the main page
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapAboutPageToDTO, AboutPageHeroUpdateRequestDTO, AboutPageCeoUpdateRequestDTO } from "@/lib/dto/aboutPage.dto";
import {auth} from "@/lib/auth"


export async function PUT(req:Request){
  try {
    //1. Auth Check
    const session = await auth();
    if(!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN" && session.user.role != "EDITOR")){
      return NextResponse.json({error:"Forbidden"}, {status:403});
    }


    const body = await req.json();
    //2. Fetch existing AboutPage
    const aboutPage = await prisma.aboutPage.findUnique({
      where:{id:1},
      include:{ceo:true, staff:true},
    });

    if(!aboutPage){
      return NextResponse.json({error: "About page not found"}, {status: 404});
    }
    
    //3. Update Hero section if present
    if(body.aboutHeroImage){
      const heroDto:AboutPageHeroUpdateRequestDTO = body;
      await prisma.aboutPage.update({
        where:{id:aboutPage.id},
        data:{
          heroImage:heroDto.aboutHeroImage,
          prevCloudinaryImgId:heroDto.prevCloudinaryImgId,
        },
      });
    }

    //4. Update CEO section if present
    if(body.meetOurCeo){
      const ceoDto: AboutPageCeoUpdateRequestDTO = body.meetOurCeo;
      await prisma.ceo.update({
        where:{aboutPageId:aboutPage.id || 0},
        data:{
          name:ceoDto.name,
          title:ceoDto.title,
          bio:ceoDto.bio,
          imageUrl:ceoDto.imageUrl,
          prevCloudinaryImgId:ceoDto.prevCloudinaryImgId,
          quote:ceoDto.quote,
        },
      });
    }

    //5. Reload updated AboutPage
    const updated = await prisma.aboutPage.findUnique({
      where:{id:1},
      include:{ceo:true, staff:true},
    });

    //6. Return clean DTO
    return NextResponse.json(mapAboutPageToDTO(updated));
  } catch (error) {
     console.error("Error updating About Page:", error);
    return NextResponse.json({ error: "Failed to update About Page" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const aboutPage = await prisma.aboutPage.findUnique({
      where: { id: 1 },
      include: { ceo: true, staff: true },
    });

    if (!aboutPage) {
      return NextResponse.json(
        { error: "About page not found" },
        { status: 404 }
      );
    }

    const dto = mapAboutPageToDTO(aboutPage);
    console.log("the original aboutPage value", aboutPage);
    console.log("checking via the route", dto);

    return NextResponse.json(dto); 
    console.log("checking via the route", dto);
  } catch (error) {
    console.error("Error fetching About Page:", error);
    return NextResponse.json(
      { error: "Failed to fetch About Page" },
      { status: 500 }
    );
  }
}
