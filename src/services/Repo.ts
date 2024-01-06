import axios from "axios";

export class Repo {
  static token = typeof window !== "undefined" && localStorage.getItem("token");

  static headers = {
    headers: {
      Authorization: `Bearer ${this.token}`,
    },
  };

  static async sendMessage(id: any, msg: any) {
    try {
      const body = {
        message: msg,
      };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sendMessage/${id}`,
        body,
        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async bookSlot(fdata: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/applyCourse`,
        fdata,
        {
          headers: {
            ...this.headers.headers,
            maxBodyLength: Infinity,
            "Content-Type": "multipart/form-data;",
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async courseDropDown() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/myCoursesDropdown`,
        this.headers
      );

      return data?.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async studentDropdown() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/studentDropdown`,
        this.headers
      );

      return data?.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async demoBatchRequest(fdata: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/createDemoBatch`,
        fdata,
        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async updatePic(fdata: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/updatePic`,
        fdata,
        {
          headers: {
            ...this.headers.headers,
            maxBodyLength: Infinity,
            "Content-Type": "multipart/form-data;",
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async createBatchRequest(fdata: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/createBatch`,
        fdata,
        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async scheduleBatchRequest(fdata: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/scheduleBatch`,
        fdata,
        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async searchRequest(fdata: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/searchCourses`,
        fdata,
        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async createConversation(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/createConversation/${id}`,
        this.headers
      );

      return data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async getBatchDetails(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getBatcheDetails/${id}`,
        this.headers
      );

      return data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async getAllPosts() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllPosts`,
        this.headers
      );

      return data?.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async getAllConversations() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllConversations`,
        this.headers
      );

      return data?.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async getCourseByGenre(category: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllCourses`,
        category,
        this.headers
      );
      // console.log(data.data, "courses");
      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async getTeacherByCourseAndGenre(teacher: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getDdTeachersWF`,
        teacher,
        this.headers
      );
      // console.log(data.data, "courses");
      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async myCourses() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/myCourses`,
        this.headers
      );
      console.log(data.data, "courses");
      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async availableCourses() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAvailableCourses`,
        this.headers
      );
      console.log(data.data, "courses");
      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async joinClass(id: any, token: string) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/joinClass/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async studentPayment() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/studentPayments`,
        this.headers
      );

      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async teacherPayins(m: any, y: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPayins`,
        { month: m, year: y },
        this.headers
      );

      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async teacherPayouts(m: any, y: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPayouts`,
        { month: m, year: y },
        this.headers
      );

      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async getGenre() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSubCategory`,
        this.headers
      );

      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async generateInvoice() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/generateInvoice`,
        this.headers
      );

      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async getAllInvoices() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllInvoices`,
        this.headers
      );

      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async getInvoice(id:any) {
    console.log(id,'id')
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getInvoice/${id}`,
        this.headers
      );

      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async getMyNotifications() {
   
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMyNotifications`,
        this.headers
      );

      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async getAllDegrees() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllDegree`,
        this.headers
      );

      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async getAllLocation() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllLocations`,
        this.headers
      );

      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async getAllTeachers() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllTeachers`,
        this.headers
      );

      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async getClassroomDetails() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getClassroomDetails/${912}`,
        this.headers
      );

      return data.data;
    } catch (error) {
      console.log(error, "ggg");
    }
  }
  static async getDbTeachers() {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getDdTeachers`,

        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async removeDegree(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/removeMeta/${id}`,

        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async removeResourse(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/removeMeta/${id}`,

        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async removeLang(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/removeMeta/${id}`,

        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async addMeta(fdata: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/addMeta`,
        fdata,
        {
          headers: {
            ...this.headers.headers,
            "Content-Type": "multipart/form-data;",
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getDegree() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMeta/degree`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getLanguage() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMeta/language`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getAward() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMeta/award`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getResourse() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMeta/resource`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getVideoFeature() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMeta/videofeature`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  // static async getVideoFeature2() {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMeta/videofeature`,

  //       this.headers
  //     );
  //     return data?.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // static async getVideoFeature3() {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMeta/videofeature`,

  //       this.headers
  //     );
  //     return data?.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  static async updateLink(fdata: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/update_central_link`,
        { link: fdata },

        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async createOrder(fdata: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/createOrder`,
        fdata,
        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async createAnonOrder(fdata: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/createAnonOrderAPI`,
        fdata,
        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async discount(fdata: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/discount`,
        fdata,
        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
      return error
     
    }
  }
  static async savePayment(fdata: any) {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/savePayment`,
        fdata,
        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async saveAnonPayment(fdata: any) {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/savePayment`,
        fdata,
        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async saveFailedPayment(fdata: any) {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/saveFailedPayment`,
        fdata,
        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async addLead(fdata: any) {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/addLead`,
        fdata,
        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async acceptInvitation(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/acceptInvitation/${id}`,

        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async declineInvitation(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/declineInvitation/${id}`,

        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async updateInvitation(id: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateApplicationStatus`,
        {
          id: id,
          status: "Deleted",
        },

        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async completeClass(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/completeClass/${id}`,

        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async completeClassStudent(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/completeClassStudent/${id}`,

        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async cancelInvitation(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cancelInvitation/${id}`,

        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async batchCancel(id: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateBatchStatus`,
        {
          id: id,
          status: "Cancelled",
        },
        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async batchCompleted(id: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateBatchStatus`,
        {
          id: id,
          status: "Completed",
        },
        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async updateApplicationStatus(id: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateApplicationStatus`,
        {
          id: id,
          status: "Archived",
        },
        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async rejectApplicationStatus(id: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateApplicationStatus`,
        {
          id: id,
          status: "Rejected",
        },
        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteBatch(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteBatch/${id}`,
        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async cancelClass(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cancelClass/${id}`,

        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async AddCourseAPI(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/addCourse/${id}`,

        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async ActivateCourse(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/activateCourse/${id}`,

        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async courseRequest() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getCourseRequests`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async studentResource() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMyResources`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getInvitationDetails(id: any) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getInvitationDetails/${id}`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async rescheduleClass(fdata: any) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/rescheduleClass`,
        fdata,
        this.headers
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getPaidStuApplication() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getStudentApplicationsPaid`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getArchiveStuApplication() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getStudentApplicationsArchive`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getPendingStuApplication() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getStudentApplications`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getPaidTeacherApplication() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTeacherApplicationsPaid`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getArchiveTeacherApplication() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTeacherApplicationsArchive`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getPendingTeacherApplication() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTeacherApplications`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getTeacher(slug: any) {
    try {
      console.log(slug, "modaldata");
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTeacher/${slug}`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getTeacherFees(slug: any) {
    try {
      console.log(slug, "modaldata");
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTeacherFees/${slug}`,

        this.headers
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
}
