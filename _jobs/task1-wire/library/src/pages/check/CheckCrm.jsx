// CHECK page (kit-only): kit AppShell + the sales-crm sidebar, around the page content COPIED with tojsx.py from
// modules/crm-invoice/dom/yop_goals_tracker__default.html (no people's names on it). Used for verify_fidelity of the sidebar, 18 Nov 2026.
// (The first pick, a Contacts notes tab, had the browser-notification popup open over the page.)
import AppShell from '../../components/AppShell.jsx'
import { CRM_NAV, CRM_NEW } from '../../data/nav.js'
export default function CheckCrm() {
  return (
    <AppShell portal="sales-crm" nav={CRM_NAV} active="Goals Tracker" flyout="goals-tracker" newMenu={CRM_NEW}>
<div className="relative">
  <nav className="flex border-b border-gray-200 py-2 px-6 bg-white items-center justify-between" aria-label="Breadcrumb">
    <ol className="flex items-center space-x-2 overflow-x-auto flex-nowrap no-scrollbar scrollbar-hide sm:flex-wrap">
      <li>
        <div>
          <a className="hover:text-gray-700 text-gray-500 sm:whitespace-normal whitespace-nowrap" href="/sales-crm/yopmail/dashboard">
            <span className="icon-home-line flex-shrink-0 text-lg flex" />
          </a>
        </div>
      </li>
      <li>
        <div className="flex items-center">
          <span className="icon-chevron-right flex-shrink-0 text-base text-gray-300" />
          <a className="text-indigo-700 cursor-default pointer-events-none ml-4 2xl:text-sm 2xl-to-xl:text-xs text-xs font-medium sm:whitespace-normal whitespace-nowrap" aria-current="page" href="/sales-crm/yopmail/goals-tracker">
            Goals Tracker
          </a>
        </div>
      </li>
    </ol>
  </nav>
  <div className="flex justify-between 2xl:px-4 px-3 2xl:py-3 py-2 bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="flex items-center relative">
      <div className="relative">
        <div className="2xl:flex-row gap-3 flex-col whitespace-nowrap 2xl:justify-start justify-center gap-x-2 ml-3 2xl:static absolute top-12 bg-white 2xl:bg-transparent border 2xl:border-none border-gray-200 2xl:border-transparent p-3 2xl:p-0 -left-24 rounded-md hidden 2xl:flex" />
      </div>
    </div>
    <div className="rounded-lg flex gap-x-2 items-center max-h-10">
      <div className="w-max flex">
        <div>
          <a href="/sales-crm/yopmail/goals-tracker?tab=Self">
            <div className="font-semibold border rounded-l-lg bg-indigo-600 text-white border-indigo-600 2xl:py-1 2xl-to-xl:py-1 py-1 2xl:h-[30px] 2xl-to-xl:h-8 h-8 flex justify-center items-center px-2 2xl:px-3" type="button">
              <div className="flex items-center gap-x-2 text-xs font-semibold">
                Self
              </div>
            </div>
          </a>
        </div>
        <div>
          <a href="/sales-crm/yopmail/goals-tracker?tab=Team">
            <div className="font-semibold border-gray-300 text-gray-700 border border-l-0 2xl:py-1 2xl-to-xl:py-1 py-1 2xl:h-[30px] 2xl-to-xl:h-8 h-8 flex justify-center items-center px-2 2xl:px-3" type="button">
              <div className="flex items-center gap-x-2 text-xs font-semibold">
                Team
              </div>
            </div>
          </a>
        </div>
        <div>
          <a href="/sales-crm/yopmail/goals-tracker?tab=Organization">
            <div className="font-semibold border-gray-300 text-gray-700 border border-l-0 rounded-r-lg 2xl:py-1 2xl-to-xl:py-1 py-1 2xl:h-[30px] 2xl-to-xl:h-8 h-8 flex justify-center items-center px-2 2xl:px-3" type="button">
              <div className="flex items-center gap-x-2 text-xs font-semibold">
                Organization
              </div>
            </div>
          </a>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-x-1.5 text-gray-400">
          <span className="icon-info-circle" data-tooltip-id="drop-down-tooltip" />
          <div className="relative !min-w-52 w-52">
            <div className="w-full border has-custom-multi-select-responsive-goal border-[#d1d5db] rounded-md bg-white text-sm outline-none flex items-center justify-between cursor-pointer min-h-[30px] py-0.5 px-1">
              <div className="flex items-center flex-1">
                <div className="flex items-center gap-1 max-w-[150px] overflow-hidden" title="">
                  <span className="text-gray-500 text-xs">
                    Select Business Units
                  </span>
                </div>
              </div>
              <div className="w-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" className="responsive-class transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] rotate-0" style={{"animation": "auto ease 0s 1 normal none running none"}}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 13.9394L17.4696 8.46973L18.5303 9.53039L11.9999 16.0607L5.46961 9.53039L6.53027 8.46973L11.9999 13.9394Z" fill="#ccc" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-2">
        <p className="text-gray-700 font-medium text-xs" title="Sep 2026">
          Sep 26
        </p>
        <div className="relative">
          <button type="button" className="bg-white flex justify-center items-center h-8 w-8 border border-gray-300 3xl:rounded-lg rounded-md" title="Filter">
            <span className="text-base block text-gray-700 icon-filter-funnel" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <div className="2xl:h-[calc(100vh-154px)] 2xl-to-xl:h-[calc(100vh-136px)] h-[calc(100vh-138px)] overflow-x-hidden overflow-y-auto 2xl:p-4 2xl-to-xl:p-3 p-3 pr-2 2xl:space-y-4 space-y-3">
    <div className="grid grid-cols-1 2xl:gap-4 gap-3 lg:grid-cols-2">
      <div className="col-span-1">
        <div className="h-full bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200 2xl:h-[60px] 2xl-to-xl:h-[50px] h-[50px] flex items-center">
            <div className="w-full flex justify-between px-4">
              <div className="flex gap-x-1">
                <div className="flex items-center gap-x-1 font-semibold text-gray-900">
                  <span className="whitespace-nowrap text-sm 3xl:max-w-full 2xl:max-w-[300px] max-w-full text-ellipsis overflow-hidden">
                    Fresh Sales Goal
                  </span>
                  <span data-tooltip-id="tooltip-Fresh Sales Goal-main-section" className="text-base icon-info-circle cursor-pointer text-gray-500" aria-describedby="tooltip-Fresh Sales Goal-main-section" />
                  <div />
                </div>
              </div>
              <div className="flex justify-end gap-x-2">
                <div className="flex items-center gap-2 ml-2">
                  <p className="text-gray-700 font-medium text-xs" title="Sep 2026">
                    Sep 26
                  </p>
                  <div className="relative">
                    <button type="button" className="bg-white flex justify-center items-center h-8 w-8 border border-gray-300 3xl:rounded-lg rounded-md" title="Filter">
                      <span className="text-base block text-gray-700 icon-filter-funnel" />
                    </button>
                  </div>
                </div>
                <button className="2xl-to-xl:h-8 2xl-to-xl:w-8 h-8 w-8 3xl:w-9 3xl:h-9 flex items-center justify-center rounded-md border border-gray-300 bg-white" title="Switch View">
                  <span className="text-base 3xl:text-lg text-gray-700 icon-layout-alt-03" />
                </button>
              </div>
            </div>
          </div>
          <div className="h-auto ">
            <div className="2xl:h-[290px] 2xl-to-xl:h-[240px] h-[240px] grid place-content-center">
              <div className="flex items-center justify-center relative">
                <div className="p-8 rounded-full bg-gray-100">
                  <span className="icon-clipboard-x flex items-center justify-center text-[40px] text-gray-500" />
                </div>
              </div>
              <div className="flex items-center justify-center flex-col">
                <p className="pb-6 pt-5 text-gray-900 font-semibold 2xl:text-sm 2xl-to-xl:text-xs text-xs z-[1]">
                  <span className="text-sm text-gray-600 font-normal">
                    No goals assigned for the selected filters.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="h-full bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200 2xl:h-[60px] 2xl-to-xl:h-[50px] h-[50px] flex items-center">
            <div className="w-full flex justify-between px-4">
              <div className="flex items-center gap-x-1 font-semibold text-gray-900">
                <span className="whitespace-nowrap text-sm 3xl:max-w-full 2xl:max-w-[300px] max-w-full text-ellipsis overflow-hidden">
                  Collections
                </span>
                <span data-tooltip-id="tooltip-Collections-main-section" className="text-base icon-info-circle cursor-pointer text-gray-500" />
                <div />
              </div>
              <div className="flex justify-end gap-x-2">
                <div className="flex items-center gap-2 ml-2">
                  <p className="text-gray-700 font-medium text-xs" title="Sep 2026">
                    Sep 26
                  </p>
                  <div className="relative">
                    <button type="button" className="bg-white flex justify-center items-center h-8 w-8 border border-gray-300 3xl:rounded-lg rounded-md" title="Filter">
                      <span className="text-base block text-gray-700 icon-filter-funnel" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-auto ">
            <div className="grid h-full 2xl:gap-4 2xl-to-xl:gap-3 gap-3 2xl:p-4 2xl-to-xl:p-3 p-3 grid-cols-1 md:grid-cols-2">
              <a rel="noopener noreferrer" className="flex-1 rounded-lg border border-gray-200 2xl:p-4 2xl-to-xl:p-3 p-3 space-y-5 bg-white transition-colors cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/60" href="/sales-crm/yopmail/invoice-management/invoices?filterQuery=%5B%7B%22field_name%22%3A%22status%22%2C%22operator%22%3A%22Is+not%22%2C%22value%22%3A%22draft%2Cvoid%22%7D%2C%7B%22field_name%22%3A%22invoice_date%22%2C%22operator%22%3A%22Is+between%22%2C%22value%22%3A%222026-09-01%2C2026-09-23%22%7D%2C%7B%22field_name%22%3A%22deal_owner%22%2C%22operator%22%3A%22Is%22%2C%22value%22%3A%2227f3c871-2975-4d32-a449-5acd1b061ab2%22%7D%5D&business_unit_id=f1dff97c-ef83-4ddb-8723-e3c493031c4b%2C686c643f-6d1c-41cd-ac1d-f4aef29f12fb%2C51a74abd-8990-44e2-ac72-e52ce53c4672%2C78b47b2f-477c-477d-8202-fe771ff7046e%2C3a384b47-8bb6-492f-be97-167f1cfff8e1%2C1e186439-5d47-468e-9614-7da107cc3df5%2C18765fce-1934-4b3c-b638-ec1df5de0758%2C94609f2b-ffc4-4aa8-9a43-a80ad2c9fad7%2C0c635e61-3385-4045-8c56-6e14cbb847a7%2Ce85bd98d-7df7-4d98-b07e-876779fcd7b0%2Ca16d0338-2926-4c9d-b302-772f001a7b09%2C186b6797-acf6-40f9-a71f-b37108da4b74%2Cdfbb6276-434a-4c22-8899-f8a2959f9953%2C9f59a611-0bac-4dd6-b0c2-7a17bc555fdc%2C782ab306-fd46-4438-b18b-d4836c7e39ec%2C9e6c26f7-516e-4064-9117-fd875cdd6390%2Cc36c56a2-2851-4460-8762-c9aa7ca22485%2C830ca659-75a0-40b3-9954-43f9901ee965%2C191bf440-6f27-4899-aede-74ac50b35953%2Cd3164aae-eb20-45b3-9e7d-9e46770bb1af%2Ce601ec08-6ed4-418d-8411-63e142607141%2C362f2fd7-1bb3-4de4-a1f7-c32a570fac33%2C941222f1-b118-4ea7-8b33-7688301e4540%2C36690029-9fdd-4036-b403-bf989a7d9e32%2C831e0059-abb3-4374-87c4-7304d8dcc1eb%2C98ea370d-1548-4d82-a97c-13535de2ac3f%2Cb8598904-dea8-45f7-ab95-b2e8327ff2d3%2C5b06e4c1-39db-4ac2-933f-43a5bdf38845%2C22fcdb64-9471-4c49-a9f2-856e733b2de6%2C2a9103e1-f960-4e00-8f10-7be9c2a2d069%2C51cdd9b4-7d00-4ec7-a488-883d65cdb0a8%2C4f06d066-4ea9-4161-baa3-8afd600ae9e6%2C8dee0d32-8532-4166-9387-db3794e0e9f6" target="_blank">
                <label className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-500 font-medium leading-5">
                  Invoice Count
                </label>
                <div className="flex items-center justify-between">
                  <p title="2" className="font-semibold text-gray-900 lg:max-w-[125px] lg:truncate xl:max-w-none xl:truncate-none md:max-w-none md:truncate-none 2xl-to-xl:text-base text-base 2xl:text-xl">
                    2
                  </p>
                  <span className="border rounded-lg border-gray-300 2xl:h-9 2xl:w-9 2xl-to-xl:h-8 2xl-to-xl:w-8 h-8 w-8 flex items-center justify-center">
                    <p className="icon-arrow-up-right text-gray-700" />
                  </span>
                </div>
              </a>
              <a rel="noopener noreferrer" className="flex-1 rounded-lg border border-gray-200 2xl:p-4 2xl-to-xl:p-3 p-3 space-y-5 bg-white transition-colors cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/60" href="/sales-crm/yopmail/invoice-management/invoices?filterQuery=%5B%7B%22field_name%22%3A%22status%22%2C%22operator%22%3A%22Is+not%22%2C%22value%22%3A%22draft%2Cvoid%22%7D%2C%7B%22field_name%22%3A%22invoice_date%22%2C%22operator%22%3A%22Is+between%22%2C%22value%22%3A%222026-09-01%2C2026-09-23%22%7D%2C%7B%22field_name%22%3A%22deal_owner%22%2C%22operator%22%3A%22Is%22%2C%22value%22%3A%2227f3c871-2975-4d32-a449-5acd1b061ab2%22%7D%5D&business_unit_id=f1dff97c-ef83-4ddb-8723-e3c493031c4b%2C686c643f-6d1c-41cd-ac1d-f4aef29f12fb%2C51a74abd-8990-44e2-ac72-e52ce53c4672%2C78b47b2f-477c-477d-8202-fe771ff7046e%2C3a384b47-8bb6-492f-be97-167f1cfff8e1%2C1e186439-5d47-468e-9614-7da107cc3df5%2C18765fce-1934-4b3c-b638-ec1df5de0758%2C94609f2b-ffc4-4aa8-9a43-a80ad2c9fad7%2C0c635e61-3385-4045-8c56-6e14cbb847a7%2Ce85bd98d-7df7-4d98-b07e-876779fcd7b0%2Ca16d0338-2926-4c9d-b302-772f001a7b09%2C186b6797-acf6-40f9-a71f-b37108da4b74%2Cdfbb6276-434a-4c22-8899-f8a2959f9953%2C9f59a611-0bac-4dd6-b0c2-7a17bc555fdc%2C782ab306-fd46-4438-b18b-d4836c7e39ec%2C9e6c26f7-516e-4064-9117-fd875cdd6390%2Cc36c56a2-2851-4460-8762-c9aa7ca22485%2C830ca659-75a0-40b3-9954-43f9901ee965%2C191bf440-6f27-4899-aede-74ac50b35953%2Cd3164aae-eb20-45b3-9e7d-9e46770bb1af%2Ce601ec08-6ed4-418d-8411-63e142607141%2C362f2fd7-1bb3-4de4-a1f7-c32a570fac33%2C941222f1-b118-4ea7-8b33-7688301e4540%2C36690029-9fdd-4036-b403-bf989a7d9e32%2C831e0059-abb3-4374-87c4-7304d8dcc1eb%2C98ea370d-1548-4d82-a97c-13535de2ac3f%2Cb8598904-dea8-45f7-ab95-b2e8327ff2d3%2C5b06e4c1-39db-4ac2-933f-43a5bdf38845%2C22fcdb64-9471-4c49-a9f2-856e733b2de6%2C2a9103e1-f960-4e00-8f10-7be9c2a2d069%2C51cdd9b4-7d00-4ec7-a488-883d65cdb0a8%2C4f06d066-4ea9-4161-baa3-8afd600ae9e6%2C8dee0d32-8532-4166-9387-db3794e0e9f6" target="_blank">
                <label className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-500 font-medium leading-5">
                  Invoice Total
                </label>
                <div className="flex items-center justify-between">
                  <p title="3,336.89" className="font-semibold text-gray-900 lg:max-w-[125px] lg:truncate xl:max-w-none xl:truncate-none md:max-w-none md:truncate-none 2xl-to-xl:text-base text-base 2xl:text-lg">
                    ؋3,336.89
                  </p>
                  <span className="border rounded-lg border-gray-300 2xl:h-9 2xl:w-9 2xl-to-xl:h-8 2xl-to-xl:w-8 h-8 w-8 flex items-center justify-center">
                    <p className="icon-arrow-up-right text-gray-700" />
                  </span>
                </div>
              </a>
              <a rel="noopener noreferrer" className="flex-1 rounded-lg border border-gray-200 2xl:p-4 2xl-to-xl:p-3 p-3 space-y-5 bg-white transition-colors cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/60" href="/sales-crm/yopmail/invoice-management/payments?filterQuery=%5B%7B%22field_name%22%3A%22status%22%2C%22operator%22%3A%22Is%22%2C%22value%22%3A%22paid%22%7D%2C%7B%22field_name%22%3A%22payment_date%22%2C%22operator%22%3A%22Is+between%22%2C%22value%22%3A%222026-09-01%2C2026-09-23%22%7D%2C%7B%22field_name%22%3A%22deal_owner%22%2C%22operator%22%3A%22Is%22%2C%22value%22%3A%2227f3c871-2975-4d32-a449-5acd1b061ab2%22%7D%5D&business_unit_id=f1dff97c-ef83-4ddb-8723-e3c493031c4b%2C686c643f-6d1c-41cd-ac1d-f4aef29f12fb%2C51a74abd-8990-44e2-ac72-e52ce53c4672%2C78b47b2f-477c-477d-8202-fe771ff7046e%2C3a384b47-8bb6-492f-be97-167f1cfff8e1%2C1e186439-5d47-468e-9614-7da107cc3df5%2C18765fce-1934-4b3c-b638-ec1df5de0758%2C94609f2b-ffc4-4aa8-9a43-a80ad2c9fad7%2C0c635e61-3385-4045-8c56-6e14cbb847a7%2Ce85bd98d-7df7-4d98-b07e-876779fcd7b0%2Ca16d0338-2926-4c9d-b302-772f001a7b09%2C186b6797-acf6-40f9-a71f-b37108da4b74%2Cdfbb6276-434a-4c22-8899-f8a2959f9953%2C9f59a611-0bac-4dd6-b0c2-7a17bc555fdc%2C782ab306-fd46-4438-b18b-d4836c7e39ec%2C9e6c26f7-516e-4064-9117-fd875cdd6390%2Cc36c56a2-2851-4460-8762-c9aa7ca22485%2C830ca659-75a0-40b3-9954-43f9901ee965%2C191bf440-6f27-4899-aede-74ac50b35953%2Cd3164aae-eb20-45b3-9e7d-9e46770bb1af%2Ce601ec08-6ed4-418d-8411-63e142607141%2C362f2fd7-1bb3-4de4-a1f7-c32a570fac33%2C941222f1-b118-4ea7-8b33-7688301e4540%2C36690029-9fdd-4036-b403-bf989a7d9e32%2C831e0059-abb3-4374-87c4-7304d8dcc1eb%2C98ea370d-1548-4d82-a97c-13535de2ac3f%2Cb8598904-dea8-45f7-ab95-b2e8327ff2d3%2C5b06e4c1-39db-4ac2-933f-43a5bdf38845%2C22fcdb64-9471-4c49-a9f2-856e733b2de6%2C2a9103e1-f960-4e00-8f10-7be9c2a2d069%2C51cdd9b4-7d00-4ec7-a488-883d65cdb0a8%2C4f06d066-4ea9-4161-baa3-8afd600ae9e6%2C8dee0d32-8532-4166-9387-db3794e0e9f6" target="_blank">
                <label className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-500 font-medium leading-5">
                  Payment Records
                </label>
                <div className="flex items-center justify-between">
                  <p title="2" className="font-semibold text-gray-900 lg:max-w-[125px] lg:truncate xl:max-w-none xl:truncate-none md:max-w-none md:truncate-none 2xl-to-xl:text-base text-base 2xl:text-xl">
                    2
                  </p>
                  <span className="border rounded-lg border-gray-300 2xl:h-9 2xl:w-9 2xl-to-xl:h-8 2xl-to-xl:w-8 h-8 w-8 flex items-center justify-center">
                    <p className="icon-arrow-up-right text-gray-700" />
                  </span>
                </div>
              </a>
              <a rel="noopener noreferrer" className="flex-1 rounded-lg border border-gray-200 2xl:p-4 2xl-to-xl:p-3 p-3 space-y-5 bg-white transition-colors cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/60" href="/sales-crm/yopmail/invoice-management/payments?filterQuery=%5B%7B%22field_name%22%3A%22status%22%2C%22operator%22%3A%22Is%22%2C%22value%22%3A%22paid%22%7D%2C%7B%22field_name%22%3A%22payment_date%22%2C%22operator%22%3A%22Is+between%22%2C%22value%22%3A%222026-09-01%2C2026-09-23%22%7D%2C%7B%22field_name%22%3A%22deal_owner%22%2C%22operator%22%3A%22Is%22%2C%22value%22%3A%2227f3c871-2975-4d32-a449-5acd1b061ab2%22%7D%5D&business_unit_id=f1dff97c-ef83-4ddb-8723-e3c493031c4b%2C686c643f-6d1c-41cd-ac1d-f4aef29f12fb%2C51a74abd-8990-44e2-ac72-e52ce53c4672%2C78b47b2f-477c-477d-8202-fe771ff7046e%2C3a384b47-8bb6-492f-be97-167f1cfff8e1%2C1e186439-5d47-468e-9614-7da107cc3df5%2C18765fce-1934-4b3c-b638-ec1df5de0758%2C94609f2b-ffc4-4aa8-9a43-a80ad2c9fad7%2C0c635e61-3385-4045-8c56-6e14cbb847a7%2Ce85bd98d-7df7-4d98-b07e-876779fcd7b0%2Ca16d0338-2926-4c9d-b302-772f001a7b09%2C186b6797-acf6-40f9-a71f-b37108da4b74%2Cdfbb6276-434a-4c22-8899-f8a2959f9953%2C9f59a611-0bac-4dd6-b0c2-7a17bc555fdc%2C782ab306-fd46-4438-b18b-d4836c7e39ec%2C9e6c26f7-516e-4064-9117-fd875cdd6390%2Cc36c56a2-2851-4460-8762-c9aa7ca22485%2C830ca659-75a0-40b3-9954-43f9901ee965%2C191bf440-6f27-4899-aede-74ac50b35953%2Cd3164aae-eb20-45b3-9e7d-9e46770bb1af%2Ce601ec08-6ed4-418d-8411-63e142607141%2C362f2fd7-1bb3-4de4-a1f7-c32a570fac33%2C941222f1-b118-4ea7-8b33-7688301e4540%2C36690029-9fdd-4036-b403-bf989a7d9e32%2C831e0059-abb3-4374-87c4-7304d8dcc1eb%2C98ea370d-1548-4d82-a97c-13535de2ac3f%2Cb8598904-dea8-45f7-ab95-b2e8327ff2d3%2C5b06e4c1-39db-4ac2-933f-43a5bdf38845%2C22fcdb64-9471-4c49-a9f2-856e733b2de6%2C2a9103e1-f960-4e00-8f10-7be9c2a2d069%2C51cdd9b4-7d00-4ec7-a488-883d65cdb0a8%2C4f06d066-4ea9-4161-baa3-8afd600ae9e6%2C8dee0d32-8532-4166-9387-db3794e0e9f6" target="_blank">
                <label className="2xl:text-sm 2xl-to-xl:text-xs text-xs text-gray-500 font-medium leading-5">
                  Payment Total
                </label>
                <div className="flex items-center justify-between">
                  <p title="456.53" className="font-semibold text-gray-900 lg:max-w-[125px] lg:truncate xl:max-w-none xl:truncate-none md:max-w-none md:truncate-none 2xl-to-xl:text-base text-base 2xl:text-lg">
                    ؋456.53
                  </p>
                  <span className="border rounded-lg border-gray-300 2xl:h-9 2xl:w-9 2xl-to-xl:h-8 2xl-to-xl:w-8 h-8 w-8 flex items-center justify-center">
                    <p className="icon-arrow-up-right text-gray-700" />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:gap-4 gap-3">
      <div className="col-span-1">
        <div className="h-full bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200 2xl:h-[60px] 2xl-to-xl:h-[50px] h-[50px] flex items-center">
            <div className="grow flex justify-between 2xl:px-4 2xl-to-xl:px-3 px-3">
              <div className="flex items-center gap-x-1 font-semibold text-gray-900">
                <span className="whitespace-nowrap text-sm 3xl:max-w-full 2xl:max-w-[300px] max-w-full text-ellipsis overflow-hidden">
                  Qualified Leads vs Goals
                </span>
                <span data-tooltip-id="tooltip-Qualified Leads vs Goals-main-section" className="text-base icon-info-circle cursor-pointer text-gray-500" aria-describedby="tooltip-Qualified Leads vs Goals-main-section" />
                <div />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <p className="text-gray-700 font-medium text-xs" title="Apr 2026 \u2013 Jun 2026">
                  Apr 26 – Jun 26
                </p>
                <div className="relative">
                  <button type="button" className="bg-white flex justify-center items-center h-8 w-8 border border-gray-300 3xl:rounded-lg rounded-md" title="Filter">
                    <span className="text-base block text-gray-700 icon-filter-funnel" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[400px]">
            <div className="flex flex-col items-center w-full h-full">
              <div className="flex w-full h-full">
                <div className="flex-1 rounded-md">
                  <div className="recharts-responsive-container" style={{"width": "100%", "height": "100%", "minWidth": "0px"}}>
                    <div className="recharts-wrapper" style={{"position": "relative", "cursor": "default", "width": "100%", "height": "100%", "maxHeight": "388px", "maxWidth": "639px"}}>
                      <svg className="recharts-surface" width="639" height="388" viewBox="0 0 639 388" style={{"width": "100%", "height": "100%"}}>
                        <title />
                        <desc />
                        <defs>
                          <clippath>
                            <rect x="60" y="52" height="296" width="549" />
                          </clippath>
                        </defs>
                        <g className="recharts-cartesian-grid">
                          <g className="recharts-cartesian-grid-horizontal">
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="348" x2="609" y2="348" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="274" x2="609" y2="274" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="200" x2="609" y2="200" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="126" x2="609" y2="126" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="52" x2="609" y2="52" />
                          </g>
                          <g className="recharts-cartesian-grid-vertical">
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="52" x2="60" y2="348" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="334.5" y1="52" x2="334.5" y2="348" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="609" y1="52" x2="609" y2="348" />
                          </g>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis">
                          <g className="recharts-cartesian-axis-ticks">
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="bottom" width="549" height="30" stroke="none" font-size="12" font-weight="500" x="60" y="369" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                                <tspan x="60" dy="0.71em">
                                  Apr-26
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="bottom" width="549" height="30" stroke="none" font-size="12" font-weight="500" x="334.5" y="369" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                                <tspan x="334.5" dy="0.71em">
                                  May-26
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="bottom" width="549" height="30" stroke="none" font-size="12" font-weight="500" x="609" y="369" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                                <tspan x="609" dy="0.71em">
                                  Jun-26
                                </tspan>
                              </text>
                            </g>
                          </g>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis">
                          <g className="recharts-cartesian-axis-ticks">
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="348" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  0
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="274" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  0
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="200" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  0
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="126" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  0
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="52" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  1
                                </tspan>
                              </text>
                            </g>
                          </g>
                        </g>
                        <g className="recharts-layer recharts-line">
                          <path stroke="#444CE7" strokeWidth="2" name="Qualified Leads" fill="none" width="549" height="296" className="recharts-curve recharts-line-curve" stroke-dasharray="690.7337646484375px 0px" d="M60,348C151.5,348,243,348,334.5,348C426,348,517.5,200,609,52" />
                          <g className="recharts-layer" />
                          <g className="recharts-layer recharts-line-dots">
                            <circle r="3" stroke="#444CE7" strokeWidth="1" name="Qualified Leads" fill="#444CE7" width="549" height="296" cx="60" cy="348" className="recharts-dot recharts-line-dot" />
                            <circle r="3" stroke="#444CE7" strokeWidth="1" name="Qualified Leads" fill="#444CE7" width="549" height="296" cx="334.5" cy="348" className="recharts-dot recharts-line-dot" />
                            <circle r="3" stroke="#444CE7" strokeWidth="1" name="Qualified Leads" fill="#444CE7" width="549" height="296" cx="609" cy="52" className="recharts-dot recharts-line-dot" />
                          </g>
                        </g>
                        <g className="recharts-layer recharts-line">
                          <path stroke="#b1b8c7" strokeWidth="2" name="Goal" fill="none" width="549" height="296" className="recharts-curve recharts-line-curve" stroke-dasharray="549px 0px" d="M60,348C151.5,348,243,348,334.5,348C426,348,517.5,348,609,348" />
                          <g className="recharts-layer" />
                          <g className="recharts-layer recharts-line-dots">
                            <circle r="3" stroke="#b1b8c7" strokeWidth="1" name="Goal" fill="#b1b8c7" width="549" height="296" cx="60" cy="348" className="recharts-dot recharts-line-dot" />
                            <circle r="3" stroke="#b1b8c7" strokeWidth="1" name="Goal" fill="#b1b8c7" width="549" height="296" cx="334.5" cy="348" className="recharts-dot recharts-line-dot" />
                            <circle r="3" stroke="#b1b8c7" strokeWidth="1" name="Goal" fill="#b1b8c7" width="549" height="296" cx="609" cy="348" className="recharts-dot recharts-line-dot" />
                          </g>
                        </g>
                      </svg>
                      <div className="recharts-legend-wrapper" style={{"position": "absolute", "width": "609px", "height": "auto", "right": "30px", "top": "20px"}}>
                        <ul className="flex justify-end space-x-4 mb-4">
                          <li className="flex items-center">
                            <span className="w-2 h-2 block rounded-full mr-1" style={{"backgroundColor": "rgb(68, 76, 231)"}} />
                            <span className="text-xs text-slate-600">
                              Qualified Leads
                            </span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 block rounded-full mr-1" style={{"backgroundColor": "rgb(177, 184, 199)"}} />
                            <span className="text-xs text-slate-600">
                              Goal
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div tabIndex="-1" className="recharts-tooltip-wrapper" style={{"visibility": "hidden", "pointerEvents": "none", "position": "absolute", "top": "0px", "left": "0px"}} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mb-3">
                <span className="text-xs font-medium text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="h-full bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200 2xl:h-[60px] 2xl-to-xl:h-[50px] h-[50px] flex items-center">
            <div className="grow flex justify-between 2xl:px-4 2xl-to-xl:px-3 px-3">
              <div className="flex items-center gap-x-1 font-semibold text-gray-900">
                <span className="whitespace-nowrap text-sm 3xl:max-w-full 2xl:max-w-[300px] max-w-full text-ellipsis overflow-hidden">
                  Lead Qualification Rate
                </span>
                <span data-tooltip-id="tooltip-Lead Qualification Rate-main-section" className="text-base icon-info-circle cursor-pointer text-gray-500" aria-describedby="tooltip-Lead Qualification Rate-main-section" />
                <div />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <p className="text-gray-700 font-medium text-xs" title="Apr 2026 \u2013 Jun 2026">
                  Apr 26 – Jun 26
                </p>
                <div className="relative">
                  <button type="button" className="bg-white flex justify-center items-center h-8 w-8 border border-gray-300 3xl:rounded-lg rounded-md" title="Filter">
                    <span className="text-base block text-gray-700 icon-filter-funnel" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[400px]">
            <div className="flex flex-col items-center w-full h-full">
              <div className="flex w-full h-full">
                <div className="flex-1 rounded-md">
                  <div className="recharts-responsive-container" style={{"width": "100%", "height": "100%", "minWidth": "0px"}}>
                    <div className="recharts-wrapper" style={{"position": "relative", "cursor": "default", "width": "100%", "height": "100%", "maxHeight": "388px", "maxWidth": "639px"}}>
                      <svg className="recharts-surface" width="639" height="388" viewBox="0 0 639 388" style={{"width": "100%", "height": "100%"}}>
                        <title />
                        <desc />
                        <defs>
                          <clippath>
                            <rect x="60" y="52" height="296" width="549" />
                          </clippath>
                        </defs>
                        <g className="recharts-cartesian-grid">
                          <g className="recharts-cartesian-grid-horizontal">
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="348" x2="609" y2="348" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="274" x2="609" y2="274" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="200" x2="609" y2="200" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="126" x2="609" y2="126" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="52" x2="609" y2="52" />
                          </g>
                          <g className="recharts-cartesian-grid-vertical">
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="52" x2="60" y2="348" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="334.5" y1="52" x2="334.5" y2="348" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="609" y1="52" x2="609" y2="348" />
                          </g>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis">
                          <g className="recharts-cartesian-axis-ticks">
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="bottom" width="549" height="30" stroke="none" font-size="12" font-weight="500" x="60" y="369" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                                <tspan x="60" dy="0.71em">
                                  Apr-26
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="bottom" width="549" height="30" stroke="none" font-size="12" font-weight="500" x="334.5" y="369" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                                <tspan x="334.5" dy="0.71em">
                                  May-26
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="bottom" width="549" height="30" stroke="none" font-size="12" font-weight="500" x="609" y="369" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                                <tspan x="609" dy="0.71em">
                                  Jun-26
                                </tspan>
                              </text>
                            </g>
                          </g>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis">
                          <g className="recharts-cartesian-axis-ticks">
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="348" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  0%
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="274" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  7%
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="200" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  14%
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="126" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  21%
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="52" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  28%
                                </tspan>
                              </text>
                            </g>
                          </g>
                        </g>
                        <g className="recharts-layer recharts-line">
                          <path stroke="#444CE7" strokeWidth="2" name="Qualified Leads" fill="none" width="549" height="296" className="recharts-curve recharts-line-curve" stroke-dasharray="666.9798583984375px 0px" d="M60,348C151.5,348,243,348,334.5,348C426,348,517.5,215.857,609,83.714" />
                          <g className="recharts-layer" />
                          <g className="recharts-layer recharts-line-dots">
                            <circle r="3" stroke="#444CE7" strokeWidth="1" name="Qualified Leads" fill="#444CE7" width="549" height="296" cx="60" cy="348" className="recharts-dot recharts-line-dot" />
                            <circle r="3" stroke="#444CE7" strokeWidth="1" name="Qualified Leads" fill="#444CE7" width="549" height="296" cx="334.5" cy="348" className="recharts-dot recharts-line-dot" />
                            <circle r="3" stroke="#444CE7" strokeWidth="1" name="Qualified Leads" fill="#444CE7" width="549" height="296" cx="609" cy="83.7142857142857" className="recharts-dot recharts-line-dot" />
                          </g>
                        </g>
                      </svg>
                      <div className="recharts-legend-wrapper" style={{"position": "absolute", "width": "609px", "height": "auto", "right": "30px", "top": "20px"}}>
                        <div className="h-8" />
                      </div>
                      <div tabIndex="-1" className="recharts-tooltip-wrapper" style={{"visibility": "hidden", "pointerEvents": "none", "position": "absolute", "top": "0px", "left": "0px"}} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mb-3">
                <span className="text-xs font-medium text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:gap-4 gap-3">
      <div className="col-span-1">
        <div className="h-full bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200 2xl:h-[60px] 2xl-to-xl:h-[50px] h-[50px] flex items-center">
            <div className="grow flex justify-between 2xl:px-4 2xl-to-xl:px-3 px-3">
              <div className="flex items-center gap-x-1 font-semibold text-gray-900">
                <span className="whitespace-nowrap text-sm 3xl:max-w-full 2xl:max-w-[300px] max-w-full text-ellipsis overflow-hidden">
                  Won Deals vs Goals
                </span>
                <span data-tooltip-id="tooltip-Won Deals vs Goals-main-section" className="text-base icon-info-circle cursor-pointer text-gray-500" aria-describedby="tooltip-Won Deals vs Goals-main-section" />
                <div />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <p className="text-gray-700 font-medium text-xs" title="Apr 2026 \u2013 Jun 2026">
                  Apr 26 – Jun 26
                </p>
                <div className="relative">
                  <button type="button" className="bg-white flex justify-center items-center h-8 w-8 border border-gray-300 3xl:rounded-lg rounded-md" title="Filter">
                    <span className="text-base block text-gray-700 icon-filter-funnel" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[400px]">
            <div className="flex flex-col items-center w-full h-full">
              <div className="flex w-full h-full">
                <div className="flex-1 rounded-md">
                  <div className="recharts-responsive-container" style={{"width": "100%", "height": "100%", "minWidth": "0px"}}>
                    <div className="recharts-wrapper" style={{"position": "relative", "cursor": "default", "width": "100%", "height": "100%", "maxHeight": "388px", "maxWidth": "639px"}}>
                      <svg className="recharts-surface" width="639" height="388" viewBox="0 0 639 388" style={{"width": "100%", "height": "100%"}}>
                        <title />
                        <desc />
                        <defs>
                          <clippath>
                            <rect x="60" y="52" height="296" width="549" />
                          </clippath>
                        </defs>
                        <g className="recharts-cartesian-grid">
                          <g className="recharts-cartesian-grid-horizontal">
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="348" x2="609" y2="348" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="274" x2="609" y2="274" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="200" x2="609" y2="200" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="126" x2="609" y2="126" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="52" x2="609" y2="52" />
                          </g>
                          <g className="recharts-cartesian-grid-vertical">
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="52" x2="60" y2="348" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="334.5" y1="52" x2="334.5" y2="348" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="609" y1="52" x2="609" y2="348" />
                          </g>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis">
                          <g className="recharts-cartesian-axis-ticks">
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="bottom" width="549" height="30" stroke="none" font-size="12" font-weight="500" x="60" y="369" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                                <tspan x="60" dy="0.71em">
                                  Apr-26
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="bottom" width="549" height="30" stroke="none" font-size="12" font-weight="500" x="334.5" y="369" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                                <tspan x="334.5" dy="0.71em">
                                  May-26
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="bottom" width="549" height="30" stroke="none" font-size="12" font-weight="500" x="609" y="369" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                                <tspan x="609" dy="0.71em">
                                  Jun-26
                                </tspan>
                              </text>
                            </g>
                          </g>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis">
                          <g className="recharts-cartesian-axis-ticks">
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="348" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  ؋0
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="274" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  ؋2K
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="200" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  ؋4K
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="126" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  ؋6K
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="52" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  ؋8K
                                </tspan>
                              </text>
                            </g>
                          </g>
                        </g>
                        <g className="recharts-layer recharts-line">
                          <path stroke="#DC6803" strokeWidth="2" name="Won Deals" fill="none" width="549" height="296" className="recharts-curve recharts-line-curve" stroke-dasharray="743.931884765625px 0px" d="M60,348C151.5,224.043,243,100.086,334.5,100.086C426,100.086,517.5,211.52,609,322.953" />
                          <g className="recharts-layer" />
                          <g className="recharts-layer recharts-line-dots">
                            <circle r="3" stroke="#DC6803" strokeWidth="1" name="Won Deals" fill="#DC6803" width="549" height="296" cx="60" cy="348" className="recharts-dot recharts-line-dot" />
                            <circle r="3" stroke="#DC6803" strokeWidth="1" name="Won Deals" fill="#DC6803" width="549" height="296" cx="334.5" cy="100.08631000000001" className="recharts-dot recharts-line-dot" />
                            <circle r="3" stroke="#DC6803" strokeWidth="1" name="Won Deals" fill="#DC6803" width="549" height="296" cx="609" cy="322.95322" className="recharts-dot recharts-line-dot" />
                          </g>
                        </g>
                        <g className="recharts-layer recharts-line">
                          <path stroke="#b1b8c7" strokeWidth="2" name="Goal" fill="none" width="549" height="296" className="recharts-curve recharts-line-curve" stroke-dasharray="549px 0px" d="M60,348C151.5,348,243,348,334.5,348C426,348,517.5,348,609,348" />
                          <g className="recharts-layer" />
                          <g className="recharts-layer recharts-line-dots">
                            <circle r="3" stroke="#b1b8c7" strokeWidth="1" name="Goal" fill="#b1b8c7" width="549" height="296" cx="60" cy="348" className="recharts-dot recharts-line-dot" />
                            <circle r="3" stroke="#b1b8c7" strokeWidth="1" name="Goal" fill="#b1b8c7" width="549" height="296" cx="334.5" cy="348" className="recharts-dot recharts-line-dot" />
                            <circle r="3" stroke="#b1b8c7" strokeWidth="1" name="Goal" fill="#b1b8c7" width="549" height="296" cx="609" cy="348" className="recharts-dot recharts-line-dot" />
                          </g>
                        </g>
                      </svg>
                      <div className="recharts-legend-wrapper" style={{"position": "absolute", "width": "609px", "height": "auto", "right": "30px", "top": "20px"}}>
                        <ul className="flex justify-end space-x-4 mb-4">
                          <li className="flex items-center">
                            <span className="w-2 h-2 block rounded-full mr-1" style={{"backgroundColor": "rgb(220, 104, 3)"}} />
                            <span className="text-xs text-slate-600">
                              Won Deals
                            </span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 block rounded-full mr-1" style={{"backgroundColor": "rgb(177, 184, 199)"}} />
                            <span className="text-xs text-slate-600">
                              Goal
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div tabIndex="-1" className="recharts-tooltip-wrapper" style={{"visibility": "hidden", "pointerEvents": "none", "position": "absolute", "top": "0px", "left": "0px"}} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mb-3">
                <span className="text-xs font-medium text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="h-full bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200 2xl:h-[60px] 2xl-to-xl:h-[50px] h-[50px] flex items-center">
            <div className="grow flex justify-between 2xl:px-4 2xl-to-xl:px-3 px-3">
              <div className="flex items-center gap-x-1 font-semibold text-gray-900">
                <span className="whitespace-nowrap text-sm 3xl:max-w-full 2xl:max-w-[300px] max-w-full text-ellipsis overflow-hidden">
                  Deal Winning Rate
                </span>
                <span data-tooltip-id="tooltip-Deal Winning Rate-main-section" className="text-base icon-info-circle cursor-pointer text-gray-500" aria-describedby="tooltip-Deal Winning Rate-main-section" />
                <div />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <p className="text-gray-700 font-medium text-xs" title="Apr 2026 \u2013 Jun 2026">
                  Apr 26 – Jun 26
                </p>
                <div className="relative">
                  <button type="button" className="bg-white flex justify-center items-center h-8 w-8 border border-gray-300 3xl:rounded-lg rounded-md" title="Filter">
                    <span className="text-base block text-gray-700 icon-filter-funnel" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[400px]">
            <div className="flex flex-col items-center w-full h-full">
              <div className="flex w-full h-full">
                <div className="flex-1 rounded-md">
                  <div className="recharts-responsive-container" style={{"width": "100%", "height": "100%", "minWidth": "0px"}}>
                    <div className="recharts-wrapper" style={{"position": "relative", "cursor": "default", "width": "100%", "height": "100%", "maxHeight": "388px", "maxWidth": "639px"}}>
                      <svg className="recharts-surface" width="639" height="388" viewBox="0 0 639 388" style={{"width": "100%", "height": "100%"}}>
                        <title />
                        <desc />
                        <defs>
                          <clippath>
                            <rect x="60" y="52" height="296" width="549" />
                          </clippath>
                        </defs>
                        <g className="recharts-cartesian-grid">
                          <g className="recharts-cartesian-grid-horizontal">
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="348" x2="609" y2="348" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="274" x2="609" y2="274" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="200" x2="609" y2="200" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="126" x2="609" y2="126" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="52" x2="609" y2="52" />
                          </g>
                          <g className="recharts-cartesian-grid-vertical">
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="60" y1="52" x2="60" y2="348" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="334.5" y1="52" x2="334.5" y2="348" />
                            <line stroke-dasharray="3 3" stroke="#9ca3af" strokeWidth="0.3" fill="none" x="60" y="52" width="549" height="296" x1="609" y1="52" x2="609" y2="348" />
                          </g>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis">
                          <g className="recharts-cartesian-axis-ticks">
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="bottom" width="549" height="30" stroke="none" font-size="12" font-weight="500" x="60" y="369" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                                <tspan x="60" dy="0.71em">
                                  Apr-26
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="bottom" width="549" height="30" stroke="none" font-size="12" font-weight="500" x="334.5" y="369" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                                <tspan x="334.5" dy="0.71em">
                                  May-26
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="bottom" width="549" height="30" stroke="none" font-size="12" font-weight="500" x="609" y="369" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="middle" fill="#666">
                                <tspan x="609" dy="0.71em">
                                  Jun-26
                                </tspan>
                              </text>
                            </g>
                          </g>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis">
                          <g className="recharts-cartesian-axis-ticks">
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="348" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  0%
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="274" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  25%
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="200" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  50%
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="126" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  75%
                                </tspan>
                              </text>
                            </g>
                            <g className="recharts-layer recharts-cartesian-axis-tick">
                              <text orientation="left" width="60" height="296" stroke="none" font-size="12" x="52" y="52" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end" fill="#666">
                                <tspan x="52" dy="0.355em">
                                  100%
                                </tspan>
                              </text>
                            </g>
                          </g>
                        </g>
                        <g className="recharts-layer recharts-line">
                          <path stroke="#DC6803" strokeWidth="2" name="Won Deals" fill="none" width="549" height="296" className="recharts-curve recharts-line-curve" stroke-dasharray="690.7337646484375px 0px" d="M60,348C151.5,200,243,52,334.5,52C426,52,517.5,52,609,52" />
                          <g className="recharts-layer" />
                          <g className="recharts-layer recharts-line-dots">
                            <circle r="3" stroke="#DC6803" strokeWidth="1" name="Won Deals" fill="#DC6803" width="549" height="296" cx="60" cy="348" className="recharts-dot recharts-line-dot" />
                            <circle r="3" stroke="#DC6803" strokeWidth="1" name="Won Deals" fill="#DC6803" width="549" height="296" cx="334.5" cy="52" className="recharts-dot recharts-line-dot" />
                            <circle r="3" stroke="#DC6803" strokeWidth="1" name="Won Deals" fill="#DC6803" width="549" height="296" cx="609" cy="52" className="recharts-dot recharts-line-dot" />
                          </g>
                        </g>
                        <g className="recharts-layer recharts-active-dot">
                          <circle cx="334.5" cy="52" r="4" fill="#DC6803" strokeWidth="2" stroke="#fff" className="recharts-dot" />
                        </g>
                      </svg>
                      <div className="recharts-legend-wrapper" style={{"position": "absolute", "width": "609px", "height": "auto", "right": "30px", "top": "20px"}}>
                        <div className="h-8" />
                      </div>
                      <div tabIndex="-1" className="recharts-tooltip-wrapper recharts-tooltip-wrapper-right recharts-tooltip-wrapper-bottom" style={{"visibility": "visible", "pointerEvents": "none", "position": "absolute", "top": "0px", "left": "0px", "transition": "transform 400ms", "transform": "translate(344.5px, 141px)"}}>
                        <div className="rounded-md text-white bg-black px-3 py-2">
                          <p className="font-semibold text-xs mb-1">
                            May-26
                          </p>
                          <div className="flex items-center gap-1 text-xs">
                            <div className="flex items-center">
                              <span className="w-2 h-2 block rounded-full mr-1" style={{"backgroundColor": "rgb(220, 104, 3)"}} />
                              <span className="font-medium text-gray-300">
                                Won Deals:
                              </span>
                            </div>
                            <p className="font-semibold">
                              100%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mb-3">
                <span className="text-xs font-medium text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="fixed top-0 left-[65px] w-[calc(100vw-120px)] h-screen bg-gray-900 z-40 opacity-0 pointer-events-none xl:left-[226px] xl:w-[calc(100vw-220px)]" />
  <div className="!hidden transition-all duration-100 ease-in-out absolute inset-0 flex items-center justify-center z-50">
    <div className="transition-opacity duration-100 ease-in-out 3xl:h-[90vh] 2xl:h-[87vh] xl:h-[88vh] h-[88vh] opacity-0 pointer-events-none bg-indigo-100 relative inline-flex mx-6 w-full max-w-max max-h-max border border-white/30 rounded-[16px] shadow-lg px-10 z-10 py-12">
      <div className="flex justify-between w-full">
        <div className="opacity-100 transition-all duration-100 ease-in-out flex flex-col 3xl:gap-y-4 2xl:gap-y-[.50rem] gap-y-2 xl:w-[35%] w-[40%] pr-5 overflow-auto 3xl:mt-20">
          <div className="max-w-max">
            <div className="bg-gray-900 flex items-center justify-center text-lg rounded-full w-[46px] h-[46px] p-4">
              <span className="icon-grid-01 bg-gray-900 text-white" />
            </div>
          </div>
          <div className="text-gray-900 font-semibold xl:text-[30px] text-lg leading-[38px]">
            Dashboard
          </div>
          <div className=" text-gray-500 font-medium text-[14px] leading-[20px]">
            Get quick access to key stats to your leads, deals, sales performance, and events that require immediate attention.
          </div>
          <div className="flex flex-col 3xl:gap-y-4 2xl:gap-y-[.50rem] xl:gap-y-4 gap-y-3">
            <div className="text-gray-500 text-[14px] font-medium !leading-[20px] flex items-start justify-start gap-x-[12px]">
              <img src="/sales-crm/assets/check-circle-821ec0f2.svg" alt="Overlay" className="min-w-[18px] max-w-[18px]" />
              <div>
                <span className="font-extrabold" />
                Easily track your total leads by date, funnel, type, source, and country.
              </div>
            </div>
            <div className="text-gray-500 text-[14px] font-medium !leading-[20px] flex items-start justify-start gap-x-[12px]">
              <img src="/sales-crm/assets/check-circle-821ec0f2.svg" alt="Overlay" className="min-w-[18px] max-w-[18px]" />
              <div>
                <span className="font-extrabold" />
                See how many deals you have won or lost in a specific time frame.
              </div>
            </div>
            <div className="text-gray-500 text-[14px] font-medium !leading-[20px] flex items-start justify-start gap-x-[12px]">
              <img src="/sales-crm/assets/check-circle-821ec0f2.svg" alt="Overlay" className="min-w-[18px] max-w-[18px]" />
              <div>
                <span className="font-extrabold" />
                Measure team performance by deals closed and time taken.
              </div>
            </div>
            <div className="text-gray-500 text-[14px] font-medium !leading-[20px] flex items-start justify-start gap-x-[12px]">
              <img src="/sales-crm/assets/check-circle-821ec0f2.svg" alt="Overlay" className="min-w-[18px] max-w-[18px]" />
              <div>
                <span className="font-extrabold" />
                Know your next steps with a clear view of closing deals, wins, and follow-ups for the month.
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-100 transition-all duration-100 ease-in-out z-5 xl:w-[65%] w-[60%] overflow-hidden flex justify-center items-center">
          <img className="h-auto w-[75%] select-none" src="https://staging-media.collabcrm.com/collab_assets/sales-crm/crm-dashboard.webp" alt="Dashboard" />
        </div>
        <div className="absolute bottom-2 right-8 flex items-center gap-x-[8px]">
          <div className="flex items-baseline gap-x-1 mr-4 select-none">
            <div className="text-[22px] font-medium text-indigo-700 pt-2">
              01
            </div>
            <div className="text-gray-500 font-medium">
              /
            </div>
            <div className="text-[14px] font-medium text-gray-500">
              14
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <button className="p-2 text-lg flex items-center justify-center bg-gray-900 text-white rounded-full transition-all duration-100 icon-chevron-left ease-in-out opacity-20 cursor-not-allowed" disabled />
            <button className="p-2 text-lg flex items-center justify-center bg-gray-900 text-white rounded-full icon-chevron-right transition-all duration-100 before:translate-x-[1px] ease-in-out cursor-pointer hover:bg-white hover:text-gray-400" />
          </div>
        </div>
      </div>
      <img src="/sales-crm/assets/tourguide-bg-logo-a18994fb.svg" alt="Overlay" className="absolute top-0 right-0 select-none" />
      <img src="/sales-crm/assets/tourguide-bg-logo-a18994fb.svg" alt="Overlay" className="absolute bottom-0 left-0 select-none" />
      <div className="flex justify-center">
        <button className="absolute top-2 right-4 bg-none border-none cursor-pointer text-black text-xl z-50 transition-all ease-in-out hover:scale-105 duration-100">
          <img src="/sales-crm/assets/tour-close-icon-9f05d932.svg" alt="Overlay" className="xl:w-10 w-[30px]" />
        </button>
      </div>
    </div>
  </div>
</div>
    </AppShell>
  )
}
