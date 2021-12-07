<template>
  <div>
    <div class="card">
      <h5>Grupo</h5>
      <DataTable
        :value="customers1"
        :scrollable="true"
        scrollHeight="400px"
        :loading="loading"
      >
        <Column field="name" header="Name" style="min-width: 200px"></Column>
        <Column
          field="country.name"
          header="Country"
          style="min-width: 200px"
        ></Column>
        <Column
          field="representative.name"
          header="Representative"
          style="min-width: 200px"
        ></Column>
        <Column
          field="status"
          header="Status"
          style="min-width: 200px"
        ></Column>
      </DataTable>
    </div>
    <Button label="Ver miembros"></Button>
  </div>
</template>
<script>
export default {}
</script>
